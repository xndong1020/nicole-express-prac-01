const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    age:{
        type: Number,
        required: true
    },
    
    sex:{
        type: String,
        required: false
    }
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;