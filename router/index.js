const Controller = require("../controllers/controller");
const router = require('express').Router()
const videos = require('./videos')

router.get('/splitgate', Controller.getSplitgate)
router.use('/videos', videos)

module.exports = router