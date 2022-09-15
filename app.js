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


























































































httpServer.listen(port, () => {
    console.log("HTTP running")
})