const express = require('express')
const router = express.Router();
const spotifyHandler = require('./spotifyHandler')
const authenticateJWT = require('../utils/Authenticate')
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', spotifyHandler.loginHandler);

router.get('/getToken', spotifyHandler.getTokenHandler);

router.get('/saveTrackAdvice', spotifyHandler.saveTrackAdviceHandler)

router.post('/getTrackAdvice', authenticateJWT, spotifyHandler.getTracks)

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router;