import App from "./server"
import "dotenv/config"
const port = process.env.PORT
App.listen(port, err => {
  if (err) {
    console.log(err)
  }
  console.log("server running on", port)
})
