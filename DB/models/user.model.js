import Sequelize from "sequelize"
export default (sequelize) =>
  sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING }
    },
    {
      tableName: "users",
      raw: true,
      timestamps: false
    }
  )
