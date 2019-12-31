import fs from "fs"
import path from"path"
import Sequelize from"sequelize"
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/./config/config.json")[env]
import setAssociation from "../DB/associations"
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}
const modelsPath = path.resolve(__dirname, "models")
export const importModels = () => {
  const models = {}
  fs.readdirSync(modelsPath)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
      const model = sequelize.import(path.join(modelsPath, file))
      models[model.name] = model
    })
  return models
}
const db = importModels()
setAssociation(db)
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
