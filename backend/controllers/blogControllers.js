const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const setBlog = async (req, res, next) => {
    try {
        const { user, title, coverImage } = req.body

        if (!user || !title) {
            res.status(400)
            throw new Error(`Fournissez les informations obligatoires`)
        }

        const userExists = User.findById(user)

        if (!userExists) {
            res.status(400)
            throw new Error(`L'utilisateur fourni n'existe pas`)
        }

        const blog = await Blog.create({ user, title, coverImage })

        if (!blog) {
            res.status(401)
            throw new Error(`vous n'êtes pas autorisé`)
        }
        res.status(201).json(blog)
    } catch (error) {
        next(error)
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const blogId = req.body.id
        if (!blogId) {
            res.status(400)
            throw new Error(`L'identifiant du blog n'est pas fourni.`)
        }

        const blog = await Blog.findById(blogId)

        if (!blog) {
            res.status(400)
            throw new Error(`Aucun blog ne correspond à cet identifiant`)
        }

        res.status(200).json(blog)

    } catch (error) {
        next(error)
    }
}

const getUserBlogs = async (req, res, next) => {
    try {
        const user = req.body.user

        if (!user) {
            res.status(400)
            throw new Error(`L'identifiant de l'utilisateur n'est pas fourni`)
        }

        const userExists = User.findById(user)

        if (!userExists) {
            res.status(400)
            throw new Error(`L'utilisateur fourni n'existe pas`)
        }

        const userBlogs = await Blog.find({ user })

        if (!userBlogs) {
            res.status(400)
            throw new Error(`Aucun blog n'a été trouvé`)
        }

        res.status(200).json({
            data: userBlogs
        })
    } catch (error) {
        next(error)
    }
}

const updateBlog = async (req, res, next) => {
    try {
        
        const id = req.body.id

        if (!id) {
            res.status(400)
            throw new Error(`L'identifiant du blog n'est pas fourni.`)
        }

        const blog = await Blog.findById(id)

        if (!blog) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun blog`)
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id, req.body, { new: true }
        )

        if (!updatedBlog) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé`)
        }

        res.status(200).json(updatedBlog)

    } catch (error) {
        next(error)
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const id = req.body.id

        if (!id) {
            res.status(400)
            throw new Error(`L'identifiant du blog n'est pas fourni.`)
        }

        const blog = await Blog.findById(id)

        if (!blog) {
            res.status(400)
            throw new Error(`L'identifiant fourni ne correspond à aucun blog`)
        }
        
        const deletedBlog = await Blog.findByIdAndRemove(id)
        if (!deletedBlog) {
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

module.exports = { setBlog, getBlogById, updateBlog, deleteBlog, getUserBlogs }