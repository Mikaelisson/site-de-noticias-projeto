const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    txt: {type: String, required: true},
    file: { type: String,
            originalname: String,
            size: Number,
            key: String,
            url: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
            required: true,
        },
    })


module.exports = mongoose.model('News', newsSchema);