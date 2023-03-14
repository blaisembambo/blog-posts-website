const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email: {
        type: String,
        required: true
    },
    displayedName: {
        type: String,
        required: true
    },
    profilePicture: String,
    sex: String,
    city: String,
    region: String,
    country: String,
    occupation: String,
    aboutMe: String,
    Interests: String
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)