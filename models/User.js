const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    permission: {type: String, required: true},
    })


module.exports = mongoose.model('User', newsSchema);