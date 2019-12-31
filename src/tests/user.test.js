import request from "./request"
import userQuery from "../../DB/query/user"
import * as auth from "../Auth/index"

const user = {
  email: "sample@123.com",
  password: "root",
  firstName: "test",
  lastName: "test"
}
const jwt = auth.getToken(user, process.env.SECRETKEY)
describe("user route test", () => {
  userQuery.getUserByEmail = jest.fn(() => ({
    id: 3,
    firstName: "test",
    lastName: "test",
    email: user.email,
    password: "63a9f0ea7bb98050796b649e85481845"
  }))
  it("should return done", async () => {
    const res = await request.get("/api")
    expect(res.body.done).toBe(true)
  })

  it("should create user", async () => {
    userQuery.createUser = jest.fn()
    const res = await request.post("/api/user").send(user)
    expect(res.status).toBe(200)
  })

  it("should update user", async () => {
    const res = await request
      .put("/api/user")
      .set("Authorization", jwt)
      .send({ ...user, firstName: "changed" })
    expect(res.status).toBe(200)
    expect(res.body).toMatchSnapshot()
  })

  it("should return user", async () => {
    const res = await request
      .get("/api/user")
      .set("Authorization", jwt)
      .send(user)
    expect(res.status).toBe(200)
    expect(res.body).toMatchSnapshot()
  })

  it("should return unauthorized", async () => {
    const res = await request
      .get("/api/user")
      .set("Authorization", `${jwt}asd`)
      .send(user)
    expect(res.status).toBe(401)
  })

  it("should login user and return token", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ email: user.email, password: user.password })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("token")
  })

  it("should return password not valid for login", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ email: user.email, password: 'asd' })
    expect(res.status).toBe(401)
  })

  it("should update user", async () => {
    userQuery.updateUser = jest.fn()
    const res = await request
      .put("/api/user")
      .set("Authorization", jwt)
      .send({ ...user, firstName: "changed" })
    expect(res.status).toBe(200)
    expect(res.body).toMatchSnapshot()
  })
})
