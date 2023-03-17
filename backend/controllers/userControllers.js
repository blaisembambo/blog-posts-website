const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    try {
        if (!user) {
            throw new Error(`les identifiants entrés sont incorrects`)
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new Error(`les identifiants entrés sont incorrects`)
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET)
        req.user = user
        res.status(200).json({ user,token })
    } catch (error) {
        res.status(400)
        next(error)
    }
}

const register = async (req, res, next) => {
    try {

        const { email, password, password2 } = req.body
        const userExist = await User.findOne({ email })

        if (!email || !password || !password2) {

            res.status(400)
            throw new Error(`Remplissez correctement tous les champs`)
        }

        if (!(password == password2)) {
            res.status(400)
            throw new Error(`Remplissez correctement tous les champs`)
        }

        if (userExist) {
            res.status(400)
            throw new Error(`Remplissez correctement tous les champs`)
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const user = await User.create({ email, password: hashed })

        if (user) {
            Profile.create({
                user: user._id,
                email: user.email,
                displayedName:user.email.split('@')[0]
            })
            res.status(201).json({ message: `vous vous êtes enregistré avec succès` })

        } else {
            res.status(400)
            throw new Error(`une erreur est survenue`)
        }


        // res.json({
        //     form_client: req.body,
        //     token:req.headers.authorization
        // })

    } catch (error) {
        res.status(400)
        next(error)
    }
}
const getMe = (req, res, next) => {

}

module.exports = { register, login, getMe }