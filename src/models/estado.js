const { DataTypes } = require("sequelize");

module.exports = (app) => {
  const Estado = app.db.define(
    "Estado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      uf: {
        type: DataTypes.CHAR(2),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
        set(value) {
          this.setDataValue("uf", value.toUpperCase());
        },
      },
    },
    {
      tableName: "estado",
    }
  );

  return Estado;
};
