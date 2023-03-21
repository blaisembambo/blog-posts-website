const FollowBlog = require('../models/followBlogModel')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const followBlog = async (req, res, next) => {
    try {
        const { blog, follower } = req.body

        if (!blog || !follower) {
            res.status(400)
            throw new Error(`Fournissez toutes les données requises`)
        }

        const blogExists = await Blog.findById(blog)
        const followerExists = await User.findById(follower)

        if (!blogExists || !followerExists) {
            res.status(400)
            throw new Error(`Une ou plusiers données fournies n'existent pas`)
        }

        const followSet = await FollowBlog.create({ blog, follower })

        if (!followSet) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé à effectuer cette action`)
        }

        res.status(201).json(followSet)
    } catch (error) {
        next(error)
    }
}

const unFollowBlog = async (req, res, next) => {
    try {
        const { blog, follower } = req.body

        if (!blog || !follower) {
            res.status(400)
            throw new Error(`Fournissez toutes les données requises`)
        }

        const blogExists = await Blog.findById(blog)
        const followerExists = await User.findById(follower)

        if (!blogExists || !followerExists) {
            res.status(400)
            throw new Error(`Une ou plusiers données fournies n'existent pas`)
        }

        const unfollowSet = await FollowBlog.findOneAndRemove({ blog, follower })

        if (!unfollowSet) {
            res.status(401)
            throw new Error(`Vous n'êtes pas autorisé à effectuer cette action`)
        }

        res.status(201).json(unfollowSet)
    } catch (error) {
        next(error)
    }
}

const followedBlogs = async (req, res, next) => {
    try {
        const user = req.body.user
        if (!user) {
            res.status(400)
            throw new Error(`L'identifiant de l'utilisateur n'est pas fourni`)
        }

        const userExists = User.findById(user)
        if (!userExists) {
            res.status(400)
            throw new Error(`L'idenfiant fourni ne correspond à aucun utilisateur`)
        }

        const followedBlogs = await FollowBlog.find({ user })
        if (!followedBlogs) {
            res.status(400)
            throw new Error(`L'utilisateur n'est abonné à aucun blog`)
        }

        let blogs = followedBlogs.map(async (followedBlog) => await Blog.findById(followedBlog.blog))

        res.status(200).json({ data: blogs })

    } catch (error) {
        next(error)
   }
}

const blogFollowers = async (req, res, next) => {
    try {
        const blog = req.body.blog
        if (!blog) {
            res.status(400)
            throw new Error(`Lidentifiant du blog n'est pas fourni`)
        }

        const blogExists = await Blog.findById(blog)
        if (!blogExists) {
            res.status(400)
            throw new Error(`Lidentifiant fourni ne correspond à aucun blog`)
        }

        const followedBlogs = await FollowBlog.find({ blog })
        if (!followedBlogs) {
            res.status(400)
            throw new Error(`Le blog fourni n'est suivi par aucun utilisateur`)
        }

        let utilisateurs = followedBlogs.map(followedBlog => followedBlog.user)

        res.status(200).json({data:utilisateurs})
    } catch (error) {
        next(error)
    }
}

module.exports = { followBlog, unFollowBlog, followedBlogs, blogFollowers }