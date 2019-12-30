import { addUser } from "../controller/userController"

export default Router => {
  const router = new Router({
    prefix: "/user"
  })
  router.get("/", ctx => {
    ctx.body = "user hello"
  })
  router.post("/", addUser)
  return router
}
