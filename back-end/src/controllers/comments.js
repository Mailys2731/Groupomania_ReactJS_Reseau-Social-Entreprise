const { Comment } = require('../db/sequelize')

exports.getComments = (req, res) => {
    Comment.findAll()
    .then(comments =>{
        const message = "Liste des commentaires récupérée"
        res.json({ message, data: comments })
    })
    .catch(error => {
        const message = `La liste des commentaires n'a pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
        })
}

exports.createComment = (req, res) => {
    console.log(req.body)
    const newComment = req.body
    const comment = new Comment({
        ...newComment,
    })
    comment.save()

    .then(comment =>{
        const message = `Le commentaire à bien été ajouté à la liste des commentaires du post $`
        res.json({ message, data: comment })
    })
     .catch(error => {
        const message = 'Le commentaire n\'a pas pu être ajouté. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
        console.log(error)
    })
}

exports.deleteComment = (req, res) => {
    Comment.findByPk(req.params.id).then(comment =>{
        if(comment === null) {
            const message = 'Le commentaire demandé n\'existe pas. Réessayez avec un autre identifiant';
            return res.status(404).json({message})  
        }
        return Comment.destroy({
            where: { id: comment.id}
        })
        .then(_ =>{
            const message = `Le commentaire à bien été supprimé.`
            res.json({ message, data: comment })
        })
    })
    .catch(error => {
        const message = 'Le commentaire n\'a pas pu être supprimé. Réessayez dans quelques instants.'
        console.log(error)
        res.status(500).json({message})
    })
}