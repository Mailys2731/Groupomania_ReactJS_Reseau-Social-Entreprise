const { Post } = require('../db/sequelize')
const fs = require("fs");
const { fileURLToPath } = require('url');
const { Console } = require('console');


exports.getPosts = (req, res) => {
    Post.findAll()
        .then(posts => {
            const message = "Liste des posts récupérée"
            res.json({ message, data: posts })
        })
        .catch(error => {
            const message = `La liste des posts n'a pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        })
}

exports.getPost = (req, res) => {
    //pk = clé primaire
    Post.findByPk(req.params.id)
        .then(post => {
            if (post === null) {
                const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant';
                return res.status(404).json({ message })
            }
            const message = "Un post a bien été trouvé."
            res.json({ message, data: post })
        })
        .catch(error => {
            const message = 'Le post n\'a pas pu être récupéré. Réessayez dans quelques instants.'
            res.status(500).json({ message, data: error })
        })
}



exports.createPost = (req, res) => {
    createPost = req.body
    let fileType = req.file.mimetype.split('/')[1]
    let newFileName = req.file.filename + '.' + fileType
    fs.rename(`public/${req.file.filename}`, `public/${req.file.filename}` + '.' + fileType, function () {
        'callback'
    })

    Post.create({
        ...createPost,

        imageUrl: `${req.protocol}://${req.get("host")}/public/${newFileName}`,

    })

        .then(post => {
            const message = `Le post à bien été ajouté à la liste des posts`
            res.json({ message, data: post })
        })
        .catch(error => {
            const message = 'Le post n\'a pas pu être ajouté. Réessayez dans quelques instants.'
            res.status(500).json({ message, data: error })
            console.log(error)
        })
}

exports.deletePost = (req, res) => {
    console.log(req.user)
    Post.findByPk(req.params.id).then(post => {
        if (post === null) {
            const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant';
            return res.status(404).json({ message })
        }
        const filename = post.imageUrl.split('public/')[1]
        fs.unlink(`public/${filename}`, () => {
            return Post.destroy({
                where: { id: post.id }
            })
                .then(_ => {
                    console.log('post supprimé avec succès')
                    const message = `Le post à bien été supprimé.`
                    res.json({ message, data: post })
                })

                .catch(error => {
                    console.log(error)
                    const message = 'Le post n\'a pas pu être supprimé. Réessayez dans quelques instants.'
                    res.status(500).json({ message})
                })
        })

    })
}


/*exports.putPost = (req, res) => {
    const id = req.params.id
    Post.update(req.body, {
        where: { id: id }
    })
        .then(_ => {
            return Post.findByPk(id).then(post => {
                if (post === null) {
                    const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({ message })
                }
                const message = `Le post ${post.name} à bien été modifié.`
                res.json({ message, data: post })
            })
        })
        .catch(error => {
            const message = 'Le post n\'a pas pu être modifié. Réessayez dans quelques instants.'
            res.status(500).json({ message, data: error })
            console.log(error)
        })
}*/