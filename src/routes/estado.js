const { Op } = require("sequelize");

module.exports = (app) => {
  /**
   * @api {get} /estados/ Lista de Estados
   * @apiGroup Estados
   * @apiDescription Retorna uma lista de todos os estados brasileiros.
   * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer asd98f09asd8f09a"
   *
   *  @apiSuccess {Object[]} estados Lista de estados.
   *  @apiErrorExample {json} Erro - Não Autorizado
   * HTTP/1.1 401 Unauthorized
   * {
   * "error": "Token não enviado"
   * }
   */
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

    /**
     * @api {post} /estados Criar um novo estado
     * @apiGroup Estados
     * @apiVersion 1.0.0
     * @apiDescription Cria um novo estado no banco de dados.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiBody {String} nome Nome do estado.
     * @apiBody {String} uf Sigla do estado.
     *
     * @apiSuccess (201) {Number} id ID gerado.
     * @apiSuccess {String} nome Nome do estado.
     * @apiSuccess {String} uf Sigla.
     *
     * @apiError CamposInvalidos Campos obrigatórios não enviados.
     * @apiError UFJaExiste A UF informada já está cadastrada.
     *
     * @apiSuccessExample {json} Sucesso:
     * HTTP/1.1 201 Created
     * { "id": 28, "nome": "Novo Estado", "uf": "NE" }
     */

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

  /**
   * @api {get} /estados/count Contagem de Estados
   * @apiGroup Estados
   * @apiDescription Retorna a quantidade total de estados cadastrados na base de dados.
   *
   * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
   *
   * @apiSuccess {Number} qtd_estados Quantidade total de estados.
   * @apiSuccessExample {json} Sucesso 200 OK:
   * HTTP/1.1 200 OK
   * {
   * "qtd_estados": 27
   * }
   *
   * @apiError (Erro 412) PreconditionFailed Falha na conexão ou erro interno do servidor.
   * @apiErrorExample {json} Erro 412 Precondition Failed:
   * HTTP/1.1 412 Precondition Failed
   * {
   * "msg": "Mensagem de erro"
   * }
   */
  app.route("/estados/count").get(async (req, res) => {
    try {
      const result = await Estado.count();
      res.json({ qtd_estados: result });
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

  // Listar todos os Estados e suas respectivas cidades

  /**
   * @api {get} /estados/cidades Listar Estados e Cidades
   * @apiGroup Estados
   * @apiDescription Retorna uma lista de todos os estados, incluindo suas respectivas cidades.
   *
   * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
   *
   * @apiSuccess {Object[]} estados Lista de objetos de estado.
   * @apiSuccess {String} estados.nome Nome do estado.
   * @apiSuccess {String} estados.uf Sigla do estado (UF).
   * @apiSuccess {Object[]} estados.Cidades Lista de cidades pertencentes ao estado.
   * @apiSuccessExample {json} Sucesso 200 OK:
   * HTTP/1.1 200 OK
   * [
   * {
   * "id": 1,
   * "nome": "São Paulo",
   * "uf": "SP",
   * "Cidades": [
   * { "id": 101, "nome": "São Caetano do Sul", "estadoId": 1 },
   * { "id": 102, "nome": "São Paulo", "estadoId": 1 }
   * ]
   * },
   * // ... outros estados ...
   * ]
   *
   * @apiError (Erro 412) PreconditionFailed Falha na conexão ou erro interno do servidor.
   * @apiErrorExample {json} Erro 412 Precondition Failed:
   * HTTP/1.1 412 Precondition Failed
   * {
   * "msg": "Mensagem de erro"
   * }
   */
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

  /**
   * @api {get} /estados/:uf/cidades Buscar Cidades por UF
   * @apiGroup Estados
   * @apiDescription Retorna um estado específico e a lista de suas cidades com base na sigla (UF) fornecida.
   *
   * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
   *
   * @apiParam {String} uf Sigla do estado (Ex: SP, MG) passada na URL.
   * @apiParamExample {url} Exemplo de Uso:
   * /estados/RJ/cidades
   *
   * @apiSuccess {Object} estado Objeto do estado encontrado.
   * @apiSuccess {String} estado.nome Nome do estado.
   * @apiSuccess {Object[]} estado.Cidades Lista de cidades pertencentes ao estado.
   * @apiSuccessExample {json} Sucesso 200 OK:
   * HTTP/1.1 200 OK
   * {
   * "id": 2,
   * "nome": "Rio de Janeiro",
   * "uf": "RJ",
   * "Cidades": [
   * { "id": 201, "nome": "Niterói", "estadoId": 2 },
   * // ... outras cidades ...
   * ]
   * }
   *
   * @apiError (Erro 404) NotFound Estado não encontrado com a UF fornecida.
   * @apiErrorExample {json} Erro 404 Not Found:
   * HTTP/1.1 404 Not Found
   * {
   * "msg": "Estado não encontrado"
   * }
   *
   * @apiError (Erro 412) PreconditionFailed Outras falhas de validação ou erro interno.
   * @apiErrorExample {json} Erro 412 Precondition Failed:
   * HTTP/1.1 412 Precondition Failed
   * {
   * "msg": "Mensagem de erro"
   * }
   */
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

  /**
   * @api {get} /estados/search Busca Estados por Nome
   * @apiGroup Estados
   * @apiDescription Busca estados cujo nome contenha o termo fornecido (LIKE).
   *
   * @apiHeader {String} Authorization Token de acesso Bearer obtido no endpoint de login.
   * @apiHeaderExample {json} Exemplo de Uso:
   * {
   * "Authorization": "Bearer SEU_TOKEN_AQUI"
   * }
   *
   * @apiParam {String} nome Termo de busca para o nome do estado (Query Parameter).
   * @apiParamExample {url} Exemplo de Uso:
   * /estados/search?nome=Minas
   *
   * @apiSuccess {Object[]} estados Lista de objetos de estado que correspondem ao critério de busca.
   * @apiSuccessExample {json} Sucesso 200 OK
   * HTTP/1.1 200 OK
   * [
   * {
   * "id": 1,
   * "nome": "Minas Gerais",
   * "uf": "MG"
   * },
   * {
   * "id": 2,
   * "nome": "Rio Grande do Norte",
   * "uf": "RN"
   * }
   * ]
   *
   * @apiError (Erro 400) BadRequest O parâmetro 'nome' é obrigatório ou está vazio.
   * @apiErrorExample {json} Erro 400 Bad Request:
   * HTTP/1.1 400 Bad Request
   *
   * @apiError (Erro 412) PreconditionFailed Outras falhas de validação ou erro interno do servidor.
   * @apiErrorExample {json} Erro 412 Precondition Failed:
   * HTTP/1.1 412 Precondition Failed
   * {
   * "msg": "Mensagem de erro"
   * }
   */
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

  /**
   * @api {get} /estados/:id Buscar estado por ID
   * @apiGroup Estados
   * @apiVersion 1.0.0
   * @apiDescription Retorna um estado específico baseado no ID.
   * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
   *
   * @apiParam {Number} id ID do estado.
   *
   * @apiSuccess {Number} id ID do estado.
   * @apiSuccess {String} nome Nome completo do estado.
   * @apiSuccess {String} uf Sigla do estado (UF).
   *
   * @apiError EstadoNaoEncontrado O ID informado não existe.
   *
   * @apiErrorExample {json} Estado não encontrado:
   * HTTP/1.1 404 Not Found
   * { "error": "Estado não encontrado" }
   */

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

    /**
     * @api {put} /estados/:id Atualizar estado
     * @apiGroup Estados
     * @apiVersion 1.0.0
     * @apiDescription Atualiza os dados de um estado já cadastrado.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {Number} id ID do estado.
     *
     * @apiBody {String} [nome] Nome do estado.
     * @apiBody {String} [uf] Sigla do estado.
     *
     * @apiSuccess {String} message Mensagem de sucesso.
     *
     * @apiError EstadoNaoEncontrado O estado a ser atualizado não existe.
     */

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

    /**
     * @api {delete} /estados/:id Remover estado
     * @apiGroup Estados
     * @apiVersion 1.0.0
     * @apiDescription Remove um estado permanentemente.
     * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer SEU_TOKEN_AQUI"
     *
     * @apiParam {Number} id ID do estado.
     *
     * @apiSuccess {String} message Mensagem indicando sucesso.
     *
     * @apiError EstadoNaoEncontrado O estado informado não existe.
     */

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
