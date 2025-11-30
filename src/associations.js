module.exports = (app) => {
  const Estado = app.models.estado;
  const Cidade = app.models.cidade;

  Estado.hasMany(Cidade, {
    foreignKey: "estado_uf",
    sourceKey: "uf",
  });
  Cidade.belongsTo(Estado, { foreignKey: "estado_uf", targetKey: "uf" });
};
