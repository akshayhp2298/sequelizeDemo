import {
  getAllPost,
  createPost,
  updatePost,
  getPostById
} from "../../DB/query/post"
import db from "../../DB"
exports.addPost = async ctx => {
  const { title, body } = ctx.request.body
  const { id } = ctx.state.user
  await createPost(db, {
    title,
    body,
    uid: id
  })
  ctx.body = { message: "post Created" }
}

exports.getAllPost = async ctx => {
  const { id } = ctx.state.user
  let post = await getAllPost(db, id)
  ctx.body = { message: "post data", post }
}

exports.updatePost = async ctx => {
  let { title, body } = ctx.request.body
  const { pid: id } = ctx.params
  let post = await getPostById(db, id)
  post = {
    title: title || post.title,
    body: body || post.body
  }
  await updatePost(db, id, post)
  ctx.body = { message: "post updated" }
}
