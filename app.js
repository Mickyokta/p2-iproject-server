const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const axios = require('axios')
const session = require('express-session');
const passport = require('passport');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;

let clientUrl = "http://localhost:5173"

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
    returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
    realm: 'http://localhost:' + port + '/',
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
        res.redirect(`/headers?steamid=${req.user["_json"].steamid}`)
    } catch (err) {
        console.log(err)
    }
});

app.get('/headers', async (req, res, next) => {
    try {
        let { steamid } = req.query
        res.redirect(`${clientUrl}/steamlogin?steamid=${steamid}`)
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/')
});

app.get('/api/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/')
});

app.get('/splitgate', async (req, res, next) => {
    try {
        let currentUser = req.user["_json"]
        let userSteamId64 = currentUser.steamid
        let { data } = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${userSteamId64}`, { headers: { "TRN-Api-Key": "0962ef8c-e74e-49ee-8463-892cbfde70c9", "Accept-Encoding": "gzip", Accept: "application/json" } })
        data = data.data
        let user = {
            username: data.platformInfo.platformUserHandle,
            avatarUrl: data.platformInfo.avatarUrl,
            id: data.platformInfo.platformUserId,
            allTimeData: {
                stats: {
                    points: data.segments[0].stats.points.displayValue,
                    kills: data.segments[0].stats.kills.displayValue,
                    assists: data.segments[0].stats.assists.displayValue,
                    deaths: data.segments[0].stats.deaths.displayValue,
                    suicides: data.segments[0].stats.suicides.displayValue,
                    teabags: data.segments[0].stats.teabags.displayValue,
                    meleeKills: data.segments[0].stats.meleeKills.displayValue,
                    portalKills: data.segments[0].stats.portalKills.displayValue,
                    killsThruPortal: data.segments[0].stats.killsThruPortal.displayValue,
                    damageDealt: data.segments[0].stats.damageDealt.displayValue,
                    matchesPlayed: data.segments[0].stats.matchesPlayed.displayValue,
                    wins: data.segments[0].stats.wins.displayValue,
                    losses: data.segments[0].stats.losses.displayValue,
                    wlPercentage: data.segments[0].stats.wlPercentage.displayValue,
                    timePlayed: data.segments[0].stats.timePlayed.displayValue,
                    headshotsLanded: data.segments[0].stats.headshotsLanded.displayValue,
                    collaterals: data.segments[0].stats.collaterals.displayValue,
                    headshotKills: data.segments[0].stats.headshotKills.displayValue,
                    headshotAccuracy: data.segments[0].stats.headshotAccuracy.displayValue,
                    shotsFired: data.segments[0].stats.shotsFired.displayValue,
                    shotsLanded: data.segments[0].stats.shotsLanded.displayValue,
                    shotsAccuracy: data.segments[0].stats.shotsAccuracy.displayValue,
                    kd: data.segments[0].stats.kd.displayValue,
                    kad: data.segments[0].stats.kad.displayValue,
                    killsPerMinute: data.segments[0].stats.killsPerMinute.displayValue,
                    killsPerMatch: data.segments[0].stats.killsPerMatch.displayValue,
                    medalDoubleKills: data.segments[0].stats.medalDoubleKills.displayValue,
                    medalTripleKills: data.segments[0].stats.medalTripleKills.displayValue,
                    medalQuadKills: data.segments[0].stats.medalQuadKills.displayValue,
                    medalQuintKills: data.segments[0].stats.medalQuintKills.displayValue,
                    medalSexKills: data.segments[0].stats.medalSexKills.displayValue,
                    medalKillstreak1: data.segments[0].stats.medalKillstreak1.displayValue,
                    medalKillstreak2: data.segments[0].stats.medalKillstreak2.displayValue,
                    medalKillstreak3: data.segments[0].stats.medalKillstreak3.displayValue,
                    medalKillstreak4: data.segments[0].stats.medalKillstreak4.displayValue,
                    medalKillstreak5: data.segments[0].stats.medalKillstreak5.displayValue,
                    medalKillstreak6: data.segments[0].stats.medalKillstreak6.displayValue,
                    rankLevel: data.segments[0].stats.rankLevel.displayValue,
                    rankXp: data.segments[0].stats.rankXp.displayValue,
                    progressionLevel: data.segments[0].stats.progressionLevel.displayValue,
                    teabagsDenied: data.segments[0].stats.teabagsDenied.displayValue,
                    revengeKills: data.segments[0].stats.revengeKills.displayValue,
                    portalsSpawned: data.segments[0].stats.portalsSpawned.displayValue,
                    ownPortalsEntered: data.segments[0].stats.ownPortalsEntered.displayValue,
                    oddballsPickedUp: data.segments[0].stats.oddballsPickedUp.displayValue,
                    oddballKills: data.segments[0].stats.oddballKills.displayValue,
                    oddballCarrierKills: data.segments[0].stats.oddballCarrierKills.displayValue,
                    kingSlayers: data.segments[0].stats.kingSlayers.displayValue,
                    killsOnHill: data.segments[0].stats.kills.displayValue,
                    killsAsVIP: data.segments[0].stats.killsAsVIP.displayValue,
                    hillsNeutralized: data.segments[0].stats.hillsNeutralized.displayValue,
                    hillsCaptured: data.segments[0].stats.hillsCaptured.displayValue,
                    highestConsecutiveKills: data.segments[0].stats.highestConsecutiveKills.displayValue,
                    flagsReturned: data.segments[0].stats.flagsReturned.displayValue,
                    flagKills: data.segments[0].stats.flagKills.displayValue,
                    flagCarrierKills: data.segments[0].stats.flagCarrierKills.displayValue,
                    firstBloods: data.segments[0].stats.firstBloods.displayValue,
                    enemyPortalsEntered: data.segments[0].stats.enemyPortalsEntered.displayValue,
                    enemyPortalsDestroyed: data.segments[0].stats.enemyPortalsDestroyed.displayValue,
                    enemyKillsOnHill: data.segments[0].stats.enemyKillsOnHill.displayValue,
                    distancePortaled: data.segments[0].stats.distancePortaled.displayValue,
                    allyPortalsEntered: data.segments[0].stats.allyPortalsEntered.displayValue,
                }
            }
        }
        for (let stat in user.allTimeData.stats) {
            if (user.allTimeData.stats[stat] == null) {
                user.allTimeData.stats[stat] = "0"
            }
        }
        res.status(200).json(data)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})