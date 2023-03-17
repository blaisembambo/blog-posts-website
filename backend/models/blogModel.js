const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    title: {
        type: String,
        required:true
    },
    coverImage:String
}, { timestamps: true })

module.exports = mongoose.model('Blog',blogSchema)