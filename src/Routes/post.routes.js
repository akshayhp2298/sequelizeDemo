import { getAllPost, addPost, updatePost } from "../controller/postController"
import { validateToken } from "../middleware"

export default Router => {
  const router = new Router({
    prefix: "/post"
  })
  router.get("/", validateToken, getAllPost)
  router.post("/", validateToken, addPost)
  router.put("/:pid", updatePost)
  return router
}
