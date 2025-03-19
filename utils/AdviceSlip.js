const axios = require('axios');

async function getAdviceByTrack(trackName) {
  try {
    console.log('Advice Slip', trackName)
    const sanitizedTrackName = trackName.replace(/\s+/g, '').toLowerCase();
    const response = await axios.get(`${process.env.ADVICE_API_URL}/search/${sanitizedTrackName}`);
    console.log('Advice Slip',response.data)

    return response.data.message.text;
  } catch (error) {
    throw new Error('Failed to fetch advice');
  }
};

module.exports = getAdviceByTrack
