describe("Routes: Cidades", () => {
  let bearerAuthorization;
  let Cidade;
  let Estado;

  before(async () => {
    Cidade = app.models.cidade;
    Estado = app.models.estado;

    // limpa tudo antes de iniciar
    await Cidade.destroy({ where: {} });
    await Estado.destroy({ where: {} });

    // cria um estado para associar cidades
    await Estado.create({
      id: 1,
      nome: "São Paulo",
      uf: "SP"
    });

    // gera autorização
    bearerAuthorization = `Bearer ${process.env.API_TOKEN}`;
  });

  beforeEach(async () => {
    await Cidade.destroy({ where: {} });
  });

  // GET /cidades
  describe("GET /cidades", () => {
    it("deve retornar lista vazia inicialmente", async () => {
      const res = await request
        .get("/cidades")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").that.has.lengthOf(0);
    });
  });

  // POST /cidades
  describe("POST /cidades", () => {
    it("deve criar uma cidade", async () => {
      const cidade = {
        nome: "Campinas",
        estado_uf: "SP"
      };

      const res = await request
        .post("/cidades")
        .set("Authorization", bearerAuthorization)
        .send(cidade);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id");
      expect(res.body.nome).to.equal("Campinas");
      expect(res.body.estado_uf).to.equal("SP");
    });
  });

  // GET /cidades/count
  describe("GET /cidades/count", () => {
    it("deve retornar a quantidade de cidades", async () => {
      await Cidade.create({ nome: "Campinas", estado_uf: "SP" });
      await Cidade.create({ nome: "Santos", estado_uf: "SP" });

      const res = await request
        .get("/cidades/count")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("qtd_cidades");
      expect(res.body.qtd_cidades).to.equal(2);
    });
  });

  // GET /cidades/estado/:uf
  describe("GET /cidades/estado/:uf", () => {
    it("deve retornar cidades de uma UF específica", async () => {
      await Cidade.create({ nome: "Campinas", estado_uf: "SP" });
      await Cidade.create({ nome: "Santos", estado_uf: "SP" });

      const res = await request
        .get("/cidades/estado/SP")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").with.lengthOf(2);
    });
  });

  // GET /cidades/nome/:nome
  describe("GET /cidades/nome/:nome", () => {
    it("deve buscar uma cidade pelo nome", async () => {
      await Cidade.create({ nome: "Campinas", estado_uf: "SP" });

      const res = await request
        .get("/cidades/nome/Campinas")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(200);
      expect(res.body.nome).to.equal("Campinas");
    });

    it("deve retornar 404 se a cidade não existir", async () => {
      const res = await request
        .get("/cidades/nome/XablauCity")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(404);
    });
  });

  // GET /cidades/search
  describe("GET /cidades/search", () => {
    it("deve retornar cidades que contenham o nome (like)", async () => {
      await Cidade.create({ nome: "Campinas", estado_uf: "SP" });
      await Cidade.create({ nome: "Campo Grande", estado_uf: "SP" });

      const res = await request
        .get("/cidades/search?nome=Camp")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").with.lengthOf(2);
    });

    it("deve retornar 400 se não enviar query", async () => {
      const res = await request
        .get("/cidades/search")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(400);
    });
  });

  // GET /cidades/:id
  describe("GET /cidades/:id", () => {
    it("deve retornar cidade pelo id", async () => {
      const cidade = await Cidade.create({
        nome: "Santos",
        estado_uf: "SP"
      });

      const res = await request
        .get(`/cidades/${cidade.id}`)
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(200);
      expect(res.body.nome).to.equal("Santos");
    });

    it("deve retornar 404 se não existir", async () => {
      const res = await request
        .get("/cidades/999")
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(404);
    });
  });

  // PUT /cidades/:id
  describe("PUT /cidades/:id", () => {
    it("deve atualizar cidade", async () => {
      const cidade = await Cidade.create({
        nome: "Sorocaba",
        estado_uf: "SP"
      });

      const res = await request
        .put(`/cidades/${cidade.id}`)
        .set("Authorization", bearerAuthorization)
        .send({ nome: "Sorocaba Atualizada" });

      expect(res.status).to.equal(204);

      const updated = await Cidade.findOne({ where: { id: cidade.id } });
      expect(updated.nome).to.equal("Sorocaba Atualizada");
    });
  });

  // DELETE /cidades/:id
  describe("DELETE /cidades/:id", () => {
    it("deve deletar cidade", async () => {
      const cidade = await Cidade.create({
        nome: "Jundiaí",
        estado_uf: "SP"
      });

      const res = await request
        .delete(`/cidades/${cidade.id}`)
        .set("Authorization", bearerAuthorization);

      expect(res.status).to.equal(204);

      const deleted = await Cidade.findOne({ where: { id: cidade.id } });
      expect(deleted).to.be.null;
    });
  });

});
