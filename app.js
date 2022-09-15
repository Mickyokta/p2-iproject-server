if (process.env.NODE_ENV == "development") {
    require("dotenv").config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require('./router/index')
const port = process.env.PORT || 3000
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

let clientUrl = "http://localhost:5173"
let serverUrl = "http://localhost:3000"
















app.use(session({
    secret: 'doyouremember21stnightofseptember',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 3600000
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new SteamStrategy({
    returnURL: serverUrl + '/api/auth/steam/return',
    realm: serverUrl + '/',
    apiKey: "F1302108B306E57C283431CD924D0FAF"
}, function (identifier, profile, done) {
    process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
    });
}
));

app.get('/', async (req, res, next) => {
    try {
        res.redirect(`${clientUrl}/steamlogin?steamid=${req.user["_json"].steamid}&username=${req.user["_json"].personaname}&avatar=${req.user["_json"].avatarmedium}`)
    } catch (err) {
        next(err)
    }
});
app.get('/api/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/')
});
app.get('/api/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/')
});

app.use('/', router)

app.use((err, req, res, next) => {
    console.log(err)
    let code = 500
    let message = "Internal Server Error"
    if (err.name == "Video url, Video title, and Video Image is required") {
        code = 400
        message = err.name
    }
    if (err.name == "Unauthorized") {
        code = 401
        message = err.name
    }
    if (err.name == "Video Not Found") {
        code = 404
        message = err.name
    }
    if (err.response.status == 404) {
        code = 404
        message = "Account Not Found"
    }
    res.status(code).json({ message })
})


httpServer.listen(port, () => {
    console.log("HTTP running")
})