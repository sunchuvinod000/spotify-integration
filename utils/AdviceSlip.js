const axios = require('axios');

async function getAdviceByTrack(trackName) {
  try {
    const sanitizedTrackName = trackName.replace(/\s+/g, '').toLowerCase();
    const response = await axios.get(`${process.env.ADVICE_API_URL}/${sanitizedTrackName.length}`);
    return response.data.slip.advice;
  } catch (error) {
    throw new Error('Failed to fetch advice', error);
  }
};

module.exports = getAdviceByTrack
