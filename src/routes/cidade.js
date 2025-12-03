const { Op } = require("sequelize");

module.exports = (app) => {
  const Cidade = app.models.cidade;
  app
    .route("/cidades")

    /**
     * @api {get} /cidades Listar todas as Cidades
     * @apiGroup Cidades
     * @apiDescription Retorna uma lista de todas as cidades cadastradas.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiSuccess {Object[]} cidades Lista de objetos de cidade.
     * @apiSuccessExample {json} Sucesso 200 OK:
     * HTTP/1.1 200 OK
     * [
     * { "id": 1, "nome": "São Paulo", "estado_uf": "SP" },
     * // ...
     * ]
     */
    .get(async (req, res) => {
      // Listar os Cidades
      try {
        const result = await Cidade.findAll();
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })

    /**
     * @api {post} /cidades Criar uma nova Cidade
     * @apiGroup Cidades
     * @apiDescription Cadastra uma nova cidade no banco de dados.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiBody {String} nome Nome da cidade. (Obrigatório)
     * @apiBody {String} estado_uf Sigla do estado a que a cidade pertence. (Obrigatório)
     *
     * @apiSuccess (201) {Number} id ID gerado para a cidade.
     * @apiSuccess {String} nome Nome da cidade.
     *
     * @apiSuccessExample {json} Sucesso 201 Created:
     * HTTP/1.1 201 Created
     * { "id": 5571, "nome": "Exemplo", "estado_uf": "SP" }
     *
     * @apiError (Erro 412) PreconditionFailed Falha na validação ou campo obrigatório não enviado.
     */

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
  /**
     * @api {get} /cidades/count Contagem de Cidades
     * @apiGroup Cidades
     * @apiDescription Retorna a quantidade total de cidades cadastradas.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiSuccess {Number} qtd_cidades Quantidade total de cidades.
     * @apiSuccessExample {json} Sucesso 200 OK:
     * HTTP/1.1 200 OK
     * {
     * "qtd_cidades": 5570
     * }
     *
     * @apiError (Erro 412) PreconditionFailed Falha na conexão ou erro interno.
     */
  app.route("/cidades/count").get(async (req, res) => {
    try {
      const result = await Cidade.count();
      res.json({ qtd_cidades: result });
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  // retornar só cidades
  /**
     * @api {get} /cidades/estado/:uf Cidades por UF
     * @apiGroup Cidades
     * @apiDescription Retorna uma lista de cidades pertencentes à sigla (UF) informada.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {String} uf Sigla do estado (Ex: SP, MG) passada na URL.
     * @apiParamExample {url} Exemplo de Uso:
     * /cidades/estado/RJ
     *
     * @apiSuccess {Object[]} cidades Lista de cidades encontradas.
     * @apiSuccessExample {json} Sucesso 200 OK:
     * HTTP/1.1 200 OK
     * [
     * { "id": 201, "nome": "Niterói", "estado_uf": "RJ" },
     * // ...
     * ]
     *
     * @apiError (Erro 412) PreconditionFailed Erro interno do servidor.
     */
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
  /**
     * @api {get} /cidades/nome/:nome Buscar Cidade por Nome
     * @apiGroup Cidades
     * @apiDescription Retorna uma cidade específica com base no nome exato fornecido.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {String} nome Nome da cidade.
     * @apiParamExample {url} Exemplo de Uso:
     * /cidades/nome/Curitiba
     *
     * @apiSuccess {Object} cidade Objeto da cidade encontrada.
     * @apiSuccessExample {json} Sucesso 200 OK:
     * HTTP/1.1 200 OK
     * { "id": 123, "nome": "Curitiba", "estado_uf": "PR" }
     *
     * @apiError (Erro 404) NotFound Cidade não encontrada com o nome fornecido.
     */
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
  /**
     * @api {get} /cidades/search Busca Cidades (LIKE)
     * @apiGroup Cidades
     * @apiDescription Busca cidades cujo nome contenha o termo fornecido (Query Parameter 'nome').
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {String} nome Termo de busca para o nome da cidade. (Query Parameter)
     * @apiParamExample {url} Exemplo de Uso:
     * /cidades/search?nome=São
     *
     * @apiSuccess {Object[]} cidades Lista de cidades que correspondem ao critério de busca.
     * @apiSuccessExample {json} Sucesso 200 OK:
     * HTTP/1.1 200 OK
     * [ { "id": 1, "nome": "São Paulo", "estado_uf": "SP" }, ]
     *
     * @apiError (Erro 400) BadRequest O parâmetro 'nome' é obrigatório ou está vazio.
     * @apiError (Erro 412) PreconditionFailed Outras falhas de validação ou erro interno.
     */
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
    /**
     * @api {get} /cidades/:id Buscar Cidade por ID
     * @apiGroup Cidades
     * @apiDescription Retorna uma cidade específica baseada no ID.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {Number} id ID da cidade.
     *
     * @apiSuccess {Object} cidade Objeto da cidade.
     * @apiSuccessExample {json} Sucesso 200 OK:
     * HTTP/1.1 200 OK
     * { "id": 123, "nome": "Curitiba", "estado_uf": "PR" }
     *
     * @apiError (Erro 404) NotFound Cidade não encontrada.
     */
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

    /**
     * @api {put} /cidades/:id Atualizar Cidade
     * @apiGroup Cidades
     * @apiDescription Atualiza os dados de uma cidade.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {Number} id ID da cidade.
     * @apiBody {String} [nome] Nome da cidade.
     * @apiBody {String} [estado_uf] Sigla do estado.
     *
     * @apiSuccess (204) NoContent Atualização bem-sucedida (sem retorno de conteúdo).
     * @apiError (Erro 412) PreconditionFailed Falha na validação ou erro interno.
     */
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

    /**
     * @api {delete} /cidades/:id Remover Cidade
     * @apiGroup Cidades
     * @apiDescription Remove uma cidade permanentemente.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {Number} id ID da cidade.
     *
     * @apiSuccess (204) NoContent Remoção bem-sucedida (sem retorno de conteúdo).
     * @apiError (Erro 412) PreconditionFailed Falha na remoção ou erro interno.
     */
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
