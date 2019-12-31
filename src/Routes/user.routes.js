import {
  getSelf,
  addUser,
  updateUser,
  loginUser
} from "../controller/userController"
import { validateToken } from "../middleware"

export default Router => {
  const router = new Router({
    prefix: "/user"
  })
  router.get("/", validateToken, getSelf)
  router.post("/", addUser)
  router.put("/", updateUser)
  router.post("/login", loginUser)
  return router
}
