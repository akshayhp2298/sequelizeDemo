import Router from "koa-router"
import userRoute from "./user.routes"
import postRoute from "./post.routes"

const router = new Router({
  prefix: "/api"
})
const routes = [userRoute,postRoute]
routes.forEach(route => router.use(route(Router).routes()))

router.get("/", ctx => {
  ctx.body = "done"
})

export default router
