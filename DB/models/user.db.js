import sequelize from "../index"
import Sequelize from "sequelize"
const Model = Sequelize.Model
class User extends Model {}
User.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "user"
  }
)

export default User
