const Controller = require("../controllers/controller")
const router = require("express").Router()

router.get('/', Controller.getVideos)
router.post('/', Controller.postVideo)
router.delete('/', Controller.deleteVideo)
router.patch('/:id', Controller.changeVideoTitle)
router.get('/:id', Controller.getOneVideo)

module.exports = router