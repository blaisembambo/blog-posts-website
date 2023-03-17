const Profile = require('../models/profileModel')


const getUserProfile = async (req, res, next) => {
    try {
        const user = req.body.user
        if (!user) {
            res.status(400)
            throw new Error(`l'id de l'utilisateur n'est pas fourni`)
        }
        const profile = await Profile.findOne({ user })

        if (!profile) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé`)
        }
        res.status(200).json(profile)
    } catch (error) {
        next(error)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        const user = req.body.user
        if (!user) {
            res.status(400)
            throw new Error(`l'id de l'utilisateur n'est pas fourni`)
        }
        const profile = await Profile.findOne({ user })

        if (!profile) {
            res.status(400)
            throw new Error(`Le profil n'existe pas`)
        }

        const updatedProfile = await Profile.findByIdAndUpdate(
            profile._id,
            req.body,
            { new: true }
        )

        if (!updatedProfile) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé`)
        }
        res.status(200).json(updatedProfile)

    } catch (error) {
        next(error)
    }
}

module.exports = { getUserProfile, updateUserProfile }