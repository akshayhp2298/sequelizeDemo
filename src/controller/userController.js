import { createUser, getUserByEmail } from "../../DB/query/user"
import md5 from "md5"
exports.addUser = async ctx => {
  const { firstName, LastName, email, password } = ctx.request.body
  await createUser({
    firstName,
    LastName,
    email,
    password: md5(password)
  })
  ctx.body = { message: "user Created" }
}

exports.loginUser = async ctx => {
  let { email, password } = ctx.request.body
  const user = await getUserByEmail(email)
  ctx.assert(user, 404, "user not found")
  password = md5(password)
  ctx.assert(password === user.password, 401, "password not valid")
  ctx.body = { message: "user logedin" }
}
