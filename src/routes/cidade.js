const { Op } = require("sequelize");

module.exports = (app) => {
  const Cidade = app.models.cidade;
  app
    .route("/cidades")
    .get(async (req, res) => {
      // Listar os Cidades
      try {
        const result = await Cidade.findAll();
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })

    .post(async (req, res) => {
      // Cadastra um Cidade
      try {
        const result = await Cidade.create(req.body);
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });

  // quantidade de cidades
  app.route("/cidades/count").get(async (req, res) => {
    try {
      const result = await Cidade.count();
      res.json({ qtd_cidades: result });
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  // retornar só cidades
  app.route("/cidades/estado/:uf").get(async (req, res) => {
    try {
      const { uf } = req.params;
      const result = await Cidade.findAll({
        where: { estado_uf: uf },
      });
      res.json(result);
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  // buscar cidade por nome
  app.route("/cidades/nome/:nome").get(async (req, res) => {
    try {
      const { nome } = req.params;
      const where = { nome };
      const result = await Cidade.findOne({ where });
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(412).json({ msg: err.message });
    }
  });

  // busca por nome (like)
  app.route("/cidades/search").get(async (req, res) => {
    try {
      const searchCidade = req.query.nome ? req.query.nome : "";
      if (!searchCidade) {
        return res.sendStatus(400);
      }
      const result = await Cidade.findAll({
        where: {
          nome: {
            [Op.like]: `%${searchCidade}%`,
          },
        },
      });
      res.json(result);
    } catch (err) {
      res.sendStatus(412).json({ msg: err.message });
    }
  });

  app
    .route("/cidades/:id")
    .get(async (req, res) => {
      // retorna um Cidade específico
      try {
        const { id } = req.params;
        const where = { id };
        const result = await Cidade.findOne({ where });
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
      // Edita um Cidade
      try {
        const { id } = req.params;
        const where = { id };
        await Cidade.update(req.body, { where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })

    .delete(async (req, res) => {
      // Deleta um Cidade
      try {
        const { id } = req.params;
        const where = { id };
        await Cidade.destroy({ where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
};
