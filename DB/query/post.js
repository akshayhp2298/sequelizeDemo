exports.getAllPost = (db, id) => db.post.findAll({ where: { uid: id } })

exports.createPost = (db, post) => db.post.create(post)

exports.getPostById = (db, id) => db.post.findOne({ id })

exports.updatePost = (db, id, post) => db.post.update(post, { where: { id } })
