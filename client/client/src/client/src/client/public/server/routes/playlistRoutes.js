const router = require('express').Router();
const playlistController = require('../controllers/playlistController');

router.post('/plan', playlistController.createPlan);

module.exports = router;
