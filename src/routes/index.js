module.exports = (app) => {
  /**
   * @api {get} / Status da API
   * @apiGroup Status
   * @apiName GetStatus
   * @apiVersion 1.0.0
   * @apiDescription Retorna informações básicas sobre o funcionamento da API.
   * @apiHeader {String} Authorization Token de acesso Bearer. Ex: "Bearer asd98f09asd8f09a"
   * @apiSuccess {String} status Mensagem indicando que a API está ativa.
   * @apiSuccess {String} version Versão atual da API.
   *
   * @apiSuccessExample {json} Sucesso
   * HTTP/1.1 200 OK
   * {
   *   "status": "Estados Brasileiros API",
   *   "version": "1.0.0"
   * }
   */
  app.get("/", (req, res) => {
    res.json({ status: "Estados Brasileiros" });
  });
};
