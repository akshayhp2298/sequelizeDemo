import Koa from "koa"
import Router from "./src/Routes"
import bodyParser from "koa-bodyparser"
const app = new Koa()
app.use(bodyParser()).use(Router.routes())
export default app
