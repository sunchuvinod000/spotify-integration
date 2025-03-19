const spotifyController = require('../controllers/spotifyController')
const jwt = require('jsonwebtoken')
const querystring = require('querystring')
require('dotenv').config()

const scope = 'user-top-read user-read-private user-read-email'

const AUTH_URL =
  `https://accounts.spotify.com/authorize?${querystring.stringify({    
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI
  })}`

const loginHandler = async (req,res, next) => {
    console.log(AUTH_URL)
    res.redirect(AUTH_URL)
}
const getTokenHandler = async (req, res) => {
        const code = req.query.code;
        try {
            const accessToken = await spotifyController.GetToken(code);
              res.redirect(`/saveTrackAdvice?token=${accessToken}`)
        } catch (error) {
            res.render('error',error);
        }
}

const saveTrackAdviceHandler = async (req, res) => {
    try {
        let accessToken = req.query.token
        const resp  = await spotifyController.saveTrackAdvice(accessToken)
        const email = resp.email
        const authToken = jwt.sign({ accessToken , email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('token', authToken, {
            httpOnly: true,    // Prevents JavaScript access
            secure: process.env.NODE_ENV === 'production',  // Use secure flag in production (only for HTTPS)
            sameSite: 'Strict',  // Prevents CSRF attacks
            maxAge: 3600000  // 1 hour expiration
          });
        res.render('index', {
            loggedIn:true,
            email,
            message: "Fetched all tracks and saved in mongodb"
        });
    } catch(error) {
        res.render('error',error);
    }
}

const getTracks = async (req, res) => {
    try {
        let email = req.email
        const tracks = await spotifyController.getTracks(email)
        res.status(200).render('index', {
            loggedIn:true,
            email,
            tracks})
    } catch(error) {
        res.render('error',error);
    }
}


module.exports = {loginHandler, getTokenHandler, saveTrackAdviceHandler, getTracks }