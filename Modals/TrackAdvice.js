// filepath: c:\Users\my\Desktop\Cosmic Chillout\Modals\TrackAdvice.js
const mongoose = require('mongoose');

const trackAdviceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    track: {
        name: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
    },
    advice: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TrackAdvice = mongoose.model('TrackAdvice', trackAdviceSchema);

module.exports = TrackAdvice;