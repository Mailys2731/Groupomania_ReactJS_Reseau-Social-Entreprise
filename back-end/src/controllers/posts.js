const { Post } = require('../db/sequelize')
const fs = require("fs");


exports.getPosts = (req, res) => {
    Post.findAll()
    .then(posts =>{
        const message = "Liste des posts récupérée"
        res.json({ message, data: posts })
    })
    .catch(error => {
        const message = `La liste des posts n'a pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
        })
}

exports.getPost = (req, res) => {
    //pk = clé primaire
    Post.findByPk(req.params.id)
    .then(post =>{
        if(post === null) {
            const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant';
            return res.status(404).json({message})  
        }
        const message = "Un post a bien été trouvé."
        res.json( { message, data: post }) 
    })
    .catch(error => {
        const message = 'Le post n\'a pas pu être récupéré. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
    })
}



exports.createPost = (req, res) => {
    createPost = JSON.parse(req.body.post)
    Post.create({
        ...createPost,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })

    .then(post =>{
        const message = `Le post ${post.name} à bien été ajouté à la liste des posts`
        res.json({ message, data: post })
    })
     .catch(error => {
        const message = 'Le post n\'a pas pu être ajouté. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
        console.log(error)
    })
}

exports.putPost = (req, res) => {
    const id = req.params.id
    Post.update(req.body, {
        where: { id: id }
    })
    .then(_ =>{
        return Post.findByPk(id).then(post => {
            if(post === null) {
                const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant';
                return res.status(404).json({message})  
            }
            const message = `Le post ${ post.name } à bien été modifié.`
            res.json({ message, data: post }) 
        })
    })
    .catch(error => {
        const message = 'Le post n\'a pas pu être modifié. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
        console.log(error)
    })
}

exports.deletePost = (req, res) => {
    Post.findByPk(req.params.id).then(post =>{
        if(post === null) {
            const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant';
            return res.status(404).json({message})  
        }
        const postDeleted = post;
        return Post.destroy({
            where: { id: post.id}
        })
        .then(_ =>{
            const message = `Le post ${postDeleted.name} à bien été supprimé.`
            res.json({ message, data: post })
        })
    })
    .catch(error => {
        const message = 'Le post n\'a pas pu être supprimé. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
    })
}