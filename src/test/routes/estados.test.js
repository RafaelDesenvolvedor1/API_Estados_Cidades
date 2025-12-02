let bearerAuthorization;
const Estado = app.models.estado;

before(async () => {
  bearerAuthorization = `Bearer ${process.env.API_TOKEN}`;
  await Estado.destroy({ where: {} });
});

describe("Testes das rotas de Estados", () => {
  let estadoCriado = null;

  // GET /estados
  it("GET /estados -> deve retornar lista de estados", async () => {
    const res = await request
      .get("/estados")
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  // POST /estados
  it("POST /estados -> deve criar um estado", async () => {
    const novoEstado = {
      nome: "Santa Catarina",
      uf: "SC",
    };

    const res = await request
      .post("/estados")
      .send(novoEstado)
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id");

    estadoCriado = res.body;
  });

  // GET /estados/:id
  it("GET /estados/:id -> deve buscar um estado específico", async () => {
    const res = await request
      .get(`/estados/${estadoCriado.id}`)
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("nome", estadoCriado.nome);
  });

  // PUT /estado/id:
  it("PUT /estados/:id -> deve atualizar um estado", async () => {
    const res = await request
      .put(`/estados/${estadoCriado.id}`)
      .send({ nome: "Estado Atualizado" })
      .set("Authorization", bearerAuthorization);

    // PUT retorna 204
    expect(res.status).to.equal(204);
  });

  // GET /estados/search?nome=
  it("GET /estados/search?nome=X -> deve buscar estados por nome (LIKE)", async () => {
    const res = await request
      .get(`/estados/search?nome=Atualizado`)
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  // GET /estados/count
  it("GET /estados/count -> deve retornar número total de estados", async () => {
    const res = await request
      .get("/estados/count")
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("qtd_estados");
  });

  // GET /estados/cidades
  it("GET /estados/cidades -> deve retornar estados com cidades", async () => {
    const res = await request
      .get("/estados/cidades")
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  // GET /estados/:uf/cidades
  it("GET /estados/:uf/cidades -> deve retornar estado + cidades", async () => {
    const res = await request
      .get(`/estados/${estadoCriado.uf}/cidades`)
      .set("Authorization", bearerAuthorization);

    expect([200, 404]).to.include(res.status);
  });

  // DELETE /estados/:id
  it("DELETE /estados/:id -> deve deletar um estado", async () => {
    const res = await request
      .delete(`/estados/${estadoCriado.id}`)
      .set("Authorization", bearerAuthorization);

    expect(res.status).to.equal(204);
  });

  // GET /estados/:id após delete (deve dar 404)
  it("GET /estados/:id -> deve retornar 404 após deletar", async () => {
    const res = await request
      .get(`/estados/${estadoCriado.id}`)
      .set("Authorization", bearerAuthorization);
    expect(res.status).to.equal(404);
  });
});
