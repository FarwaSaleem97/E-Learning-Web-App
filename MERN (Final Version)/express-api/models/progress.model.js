const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const progressSchema = new Schema({

    studentID: {
        type: String
    },
    courseID: {
        type: String
    }
    
});

module.exports = mongoose.model('progress', progressSchema);
