const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({

    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    demoURL: {
        type: String
    },
    lengthHours: {
        type: String
    },
    lengthMinutes: {
        type: String
    }

});

module.exports = mongoose.model('course', courseSchema);
