const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, `ajoutez l'adresse email svp`]
    },
    password: {
        type: String,
        required: [true, `remplissez le mot de passe svp`],
        unique: true
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)