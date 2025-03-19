const getAdviceByTrack = require('../utils/AdviceSlip')
const TrackAdvice = require('../Modals/TrackAdvice')
const axios = require('axios');
async function GetToken(code) {
    try {
        const response = await axios.post(process.env.TOKEN_URL, new URLSearchParams({
            code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const accessToken = response.data.access_token
        return accessToken
        //res.status(200).json({message: "User login successful"})
    } catch (err) {
        return err
    }
}
async function saveTrackAdvice(accessToken) {
    try {
        // Fetch the authenticated user's profile using their access token
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
        const email = userResponse.data.email;

        //Fetch the user's top tracks using their access token
        const topTracksResponse = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });
        const trackName = topTracksResponse?.data?.items[0].name || "Dancing Star" 
        const artistName = topTracksResponse?.data?.items[0].artists.map(artist => artist.name).join(', ') || "Unknown Artist"
        const adviceName = await getAdviceByTrack(trackName)
        const record = new TrackAdvice({
            email,
            track: {
                name: trackName,
                artist: artistName || 'Unknown Artist'
            },
            advice: adviceName,
            createdAt: new Date()
        })
        record.save()
        return { email }
    } catch (err) {
        throw err
    }
}

async function getTracks(email) {
    try {
        const tracks = await TrackAdvice.find({ email })
        return tracks
    } catch (err) {
        return err
    }
}
module.exports = { GetToken, saveTrackAdvice, getTracks }