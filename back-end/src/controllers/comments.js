

exports.getComments = (req, res) => {
    commments.find()
    const message = "Liste des commentaires récupérée"
    res.json(success(message, comments))
}

exports.getComment = (req, res) => {
    const id = parseInt(req.params.id)
    const comment = comments.findOne({id:req.params.id})
    const message = "Un commentaire a bien été trouvé."
    res.json(success(message, comment)) 
}

exports.postComment = (req, res) => {
    const id = getUniqueId (comments)
    const Created = {...req.body, ...{id: id, created: new Date()}}
    posts.push(postCreated)
    const message = `Le commentaire ${commentCreated.name} à bien été ajouté à la liste des commentaires`
    res.json(success(message, commentCreated))
}

exports.putComment = (req, res) => {
    const commentUpdated = { ...req.body, id: id }
    //Pour chaque post, on retourne le post sauf s'il s'agit de celui à modifier.
    comments = comments.map(post => {
        return comment.id === id ? commentUpdate : post
    })
    const message = `Le commentaire ${ commentUpdated.name } à bien été modifié.`
    res.json(success( message, commentUpdated ))
}

exports.deleteComment = (req, res) => {
    const id = parseInt(req.params.id)
    const commentDeleted = comments.find(post => comment=id ===id)
    comments.filter(comment => comment=id !== id)
    const message = `Le commentaire ${commentDeleted.name} à bient été supprimé.`
    res.json(success(message, commentDeleted))
}