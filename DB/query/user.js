exports.getAllUser = db => db.users.findAll({ raw: true })

exports.createUser = (db, user) => db.users.create(user)

exports.getUserByEmail = (db, email) => db.users.findOne({ email })

exports.updateUser = (db, user) =>
  db.users.update(user, { where: { email: user.email } })
