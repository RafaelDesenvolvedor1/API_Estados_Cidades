const { Op } = require("sequelize");

module.exports = (app) => {
  const Estado = app.models.estado;
  const Cidade = app.models.cidade;
  app
    .route("/estados")
    .get(async (req, res) => {
      // Listar os estados
      try {
        const result = await Estado.findAll();
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })

    .post(async (req, res) => {
      // Cadastra um estado
      try {
        const result = await Estado.create(req.body);
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });

  // quantidade de estados
  app.route("/estados/count").get(async (req, res) => {
    try {
      const result = await Estado.count();
      res.json({qtd_estados: result});
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });
  // Listar todos os Estados e suas respectivas cidades
  app.route("/estados/cidades").get(async (req, res) => {
    try {
      const result = await Estado.findAll({
        include: [
          {
            model: Cidade,
          },
        ],
      });
      res.json(result);
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  // lista estados e cidades de uma uf específica
  app.route("/estados/:uf/cidades").get(async (req, res) => {
    try {
      const { uf } = req.params;
      const result = await Estado.findOne({
        where: { uf },
        include: [{ model: Cidade }],
      });

      if (result) {
        res.json(result);
      } else {
        return res.status(404).json({ msg: "Estado não encontrado" });
      }
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  // busca por nome (like)
  app.route("/estados/search").get(async (req, res) => {
    try {
      const searchEstado = req.query.nome ? req.query.nome : "";
      if (!searchEstado) {
        return res.sendStatus(400);
      }
      const result = await Estado.findAll({
        where: {
          nome: {
            [Op.like]: `%${searchEstado}%`,
          },
        },
      });
      res.json(result);
    } catch (err) {
      res.sendStatus(412).json({ msg: err.message });
    }
  });
  // buscar estado pela UF (além do ID)
  app.route("/estados/:uf").get(async (req, res) => {
    try {
      const { uf } = req.params;
      const where = { uf };
      const result = await Estado.findOne({ where });
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  app
    .route("/estados/:id")
    .get(async (req, res) => {
      // retorna um estado específico
      try {
        const { id } = req.params;
        const where = { id };
        const result = await Estado.findOne({ where });
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    .put(async (req, res) => {
      // Edita um estado
      try {
        const { id } = req.params;
        const where = { id };
        await Estado.update(req.body, { where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })

    .delete(async (req, res) => {
      // Deleta um estado
      try {
        const { id } = req.params;
        const where = { id };
        await Estado.destroy({ where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
};
