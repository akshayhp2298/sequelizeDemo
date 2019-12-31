import { createUser, getUserByEmail, updateUser } from "../../DB/query/user"
import { getToken } from "../Auth/index"
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
  const { email } = ctx.state.user
  let user = await getUserByEmail(db, email)
  delete user["password"]
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
  user === undefined && ctx.throw(404, "user not found")
  password = md5(password)
  password !== user.password &&
    ctx.throw(401, { message: "password not valid" })
  delete user.password
  const token = await getToken(user)
  ctx.body = { message: "user logedin", token }
}
