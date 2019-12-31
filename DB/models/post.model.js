import Sequelize from "sequelize"

export default sequelize =>
  sequelize.define(
    "post",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: { type: Sequelize.STRING },
      body: { type: Sequelize.STRING }
    },
    {
      tableName: "posts",
      raw: true,
      timestamps: false
    }
  )
