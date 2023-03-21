const ReadingList = require('../models/readingListModel')
const User = require('../models/userModel')

const getReadingListPosts = async (req, res, next) => {
    try {
        const user = req.body.user
        if (!user) {
            res.status(400)
            throw new Error(`L'identifiant de l'utilisateur n'est pas fourni`)
        }

        /* A supprimer lors de la protection avec le middleware */
        const userExists = await User.findById(user)
        if (!userExists) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun utilisateur`)
        }

        const readingList = ReadingList.findOne({ user })
        if (!readingList) {
            res.status(400)
            throw new Error(`L'utilisateur n'a pas de liste de lecture`)
        }

        const posts = readingList.readingListPosts()
        if (!posts) {
            res.status(400)
            throw new Error(`L'utilisateur n'est abonné à aucun blog`)
        }

        res.status(200).json({ data: posts })
    } catch (error) {
        next(error)
    }
}

module.exports = { getReadingListPosts }