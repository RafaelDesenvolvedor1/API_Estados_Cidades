const { DataTypes } = require("sequelize");

module.exports = (app) => {
  const Cidade = app.db.define(
    "Cidade",
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
      estado_uf: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
        set(value) {
          this.setDataValue("estado_uf", value.toUpperCase());
        },
      },
    },
    {
      tableName: "cidade",
    }
  );

  return Cidade;
};
