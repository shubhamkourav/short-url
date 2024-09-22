const mongoose = require('mongoose');

const shortenSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
});

module.exports = mongoose.model('Shorten', shortenSchema);