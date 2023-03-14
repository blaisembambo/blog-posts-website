const Profile = require('../models/profileModel')


const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            res.status(400)
            throw new Error(`l'id de l'utilisateur n'est pas fourni`)
        }
        const profile = await Profile.findOne({ user })

        if (!profile) {
            res.status(400)
            throw new Error(`Le profil n'est trouvé`)
        }
        res.status(200).json(profile)
    } catch (error) {
        next(error)
    }
}

const updateUserProfile = (req, res, next) => {
 const updatedProfile = {}
}

module.exports = { getUserProfile, updateUserProfile }