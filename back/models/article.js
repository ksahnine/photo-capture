const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    id: {
        type: String
    },
    title: {
        type: String
    },
    photo: {
        type: String
    },
    description: {
        type: String
    }

});

module.exports = mongoose.model('Article', schema);
