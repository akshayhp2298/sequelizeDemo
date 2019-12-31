import request from "./request"
import postQuery from "../../DB/query/post"

const user = {
  email: "sample@123.com",
  password: "root",
  firstName: "test",
  lastName: "test"
}
const jwt = auth.getToken(user, process.env.SECRETKEY)
describe("user route test", () => {})
