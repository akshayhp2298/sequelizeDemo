import User from "../models/user.db"

exports.getAllUser = () => User.findAll({ raw: true })

exports.createUser = user => User.create(user)

exports.getUserByEmail = email => User.findAll({ email })
