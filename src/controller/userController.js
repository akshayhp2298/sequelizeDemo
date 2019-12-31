import { createUser, getUserByEmail, updateUser } from "../../DB/query/user"
import {getToken} from '../Auth/index'
import db from "../../DB"
import md5 from "md5"
exports.addUser = async ctx => {
  const { firstName, lastName, email, password } = ctx.request.body
  await createUser(db, {
    firstName,
    lastName,
    email,
    password: md5(password)
  })
  ctx.body = { message: "user Created" }
}

exports.getSelf = async ctx => {
  const { email } = ctx.request.body
  let user = await getUserByEmail(db, email)
  delete user.dataValues["password"]
  ctx.body = { message: "user data", user }
}

exports.updateUser = async ctx => {
  let { email, firstName, lastName } = ctx.request.body
  let user = await getUserByEmail(db, email)
  user = {
    email,
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName
  }
  await updateUser(db, user)
  ctx.body = { message: "user updated" }
}

exports.loginUser = async ctx => {
  let { email, password } = ctx.request.body
  const user = await getUserByEmail(db, email)
  ctx.assert(user, 404, "user not found")
  password = md5(password)
  ctx.assert(password === user.password, 401, "password not valid")
  delete user.dataValues.password
  const token = await getToken(user.dataValues)
  ctx.body = { message: "user logedin",token }
}
