const Post = require('../models/postModel')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const setPost = async (req, res, next) => {
    try {
        const { blog, title, content } = req.body

        if (!blog || !title || !content) {
            res.status(400)
            throw new Error(`Fournissez tous les champs requis`)
        }

        const blogExists = await Blog.findById(blog)

        if (!blogExists) {
            res.status(400)
            throw new Error(`Le blog fourni n'existe pas dans la base`)
        }

        const post = await Post.create({ blog, title, content })

        if (!post) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé à effectuer cette action`)
        }

        res.status(201).json(post)
    } catch (error) {
        next(error)
   }
}

const getPostById = async (req, res, next) => {
    try {
        const postId = req.body.id
        if (!postId) {
            res.status(400)
            throw new Error(`L'identifiant de l'article n'est pas fourni.`)
        }

        const post = await Post.findById(postId)

        if (!post) {
            res.status(400)
            throw new Error(`Aucun article ne correspond à cet identifiant`)
        }

        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}

const getBlogPosts = async (req, res, next) => {
    try {
        const blog = req.body.blog

        if (!blog) {
            res.status(400)
            throw new Error(`L'identifiant du blog n'est pas fourni`)
        }

        const blogExists = await Blog.findById(blog)

        if (!blogExists) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun blog`)
        }

        const blogPosts = await Post.find({ blog })

        if (!blogPosts) {
            res.status(400)
            throw new Error(`Aucun article n'a été trouvé`)
        }

        res.status(200).json({
            data: blogPosts
        })
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {

        const id = req.body.id

        if (!id) {
            res.status(400)
            throw new Error(`L'identifiant de l'article n'est pas fourni.`)
        }

        const post = await Post.findById(id)

        if (!post) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun article`)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, req.body, { new: true }
        )

        if (!updatedPost) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé`)
        }

        res.status(200).json(updatedPost)

    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = req.body.id

        if (!id) {
            res.status(400)
            throw new Error(`L'identifiant de l'article n'est pas fourni.`)
        }

        const post = await Post.findById(id)

        if (!post) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun article`)
        }

        const deletedPost = await Post.findByIdAndRemove(id)
        if (!deletedPost) {
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

const updateFeedbackWithALike = async (req, res, next) => {
    try {
        const { postId, feedbackerId } = req.body
        const feedbackType = 'likes'

        if (!postId || !feedbackerId || !feedbackType) {
            res.status(400)
            throw new Error(`Fournissez tous les éléments requis.`)
        }

        const post = await Post.findById(postId)

        if (!post) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun article`)
        }

        const feedbackerExists = await User.findById(feedbackerId)
        if (!feedbackerExists) {
            res.status(400)
            throw new Error(`L'idenifiant fourni ne correspond à aucun utilisateur`)
        }

        res.status(200).json({
            feedback: await post.updateFeedback(feedbackerId, feedbackType)})

    } catch (error) {
        next(error)
}
}

const updateFeedbackWithADislike = async (req, res, next) => {
    try {
        const { postId, feedbackerId } = req.body
        const feedbackType = 'dislikes'

        if (!postId || !feedbackerId || !feedbackType) {
            res.status(400)
            throw new Error(`Fournissez tous les éléments requis.`)
        }

        const post = await Post.findById(postId)
        if (!post) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun article`)
        }

        const feedbackerExists = await User.findById(feedbackerId)
        if (!feedbackerExists) {
            res.status(400)
            throw new Error(`L'idenifiant fourni ne correspond à aucun utilisateur`)
        }

        res.status(200).json({
            feedback: await post.updateFeedback(feedbackerId, feedbackType)
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { setPost, getPostById, getBlogPosts, updatePost, deletePost, updateFeedbackWithALike, updateFeedbackWithADislike }
