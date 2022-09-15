const Controller = require("../controllers/controller");
const router = require('express').Router()


router.get('/splitgate', Controller.getSplitgate)


module.exports = router