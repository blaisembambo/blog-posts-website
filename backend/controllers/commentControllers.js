const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')

const setComment = async (req, res, next) => {
    try {
        const { author, post, content } = req.body

        if (!author || !post || !content) {
            res.status(400)
            throw new Error(`Fournissez tous les champs requis`)
        }

        const authorExists = await User.findById(author)
        const postExists = await Post.findById(post)

        if (!authorExists || !postExists) {
            res.status(400)
            throw new Error(`Une ou plusieurs données fournies n'existent pas dans la base`)
        }

        const comment = await Comment.create({ author, post, content })

        if (!comment) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé à effectuer cette action`)
        }

        res.status(201).json(comment)
    } catch (error) {
        next(error)
    }
}

const getPostComments = async (req, res, next) => {
    try {
        const post = req.body.post

        if (!post) {
            res.status(400)
            throw new Error(`L'identifiant de l'article n'est pas fourni`)
        }

        const postExists = await Post.findById(post)

        if (!postExists) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun article`)
        }

        const postComments = await Comment.find({ post })

        if (!postComments) {
            res.status(400)
            throw new Error(`Aucun commentaire n'a été trouvé`)
        }

        res.status(200).json({
            data: postComments
        })
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const id = req.body.id

        if (!id) {
            res.status(400)
            throw new Error(`L'identifiant du commentaire n'est pas fourni.`)
        }

        const comment = await Comment.findById(id)

        if (!comment) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun commentaire`)
        }

        const deletedComment = await Comment.findByIdAndRemove(id)
        if (!deletedComment) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé à effectuer cette action.`)
        }

        res.status(200).json({
            message: `suppression réussie`,
            id: id
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { setComment, getPostComments, deleteComment }
