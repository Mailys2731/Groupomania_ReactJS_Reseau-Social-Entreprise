

exports.getPosts = (req, res) => {
    posts.find()
    const message = "Liste des posts récupérée"
    res.json(success(message, posts))
}

exports.getPost = (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.findOne({id:req.params.id})
    const message = "Un post a bien été trouvé."
    res.json(success(message, post)) 
}

exports.postPost = (req, res) => {
    const id = getUniqueId (posts)
    const postCreated = {...req.body, ...{id: id, created: new Date()}}
    posts.push(postCreated)
    const message = `Le post ${postCreated.name} à bien été ajouté à la liste des posts`
    res.json(success(message, postCreated))
}

exports.putPost = (req, res) => {
    const postUpdated = { ...req.body, id: id }
    //Pour chaque post, on retourne le post sauf s'il s'agit de celui à modifier.
    posts = posts.map(post => {
        return post.id === id ? postUpdate : post
    })
    const message = `Le post ${ postUpdated.name } à bien été modifié.`
    res.json(success( message, postUpdated ))
}

exports.deletePost = (req, res) => {
    const id = parseInt(req.params.id)
    const postDeleted = posts.find(post => post=id ===id)
    posts.filter(post => post=id !== id)
    const message = `Le post ${postDeleted.name} à bient été supprimé.`
    res.json(success(message, postDeleted))
}