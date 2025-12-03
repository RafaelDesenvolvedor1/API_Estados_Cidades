const bodyParser = require("body-parser");
const express = require('express');

module.exports = (app) => {
  app.set("port", process.env.PORT || 3000);
  app.set("json spaces", 4);
  app.use(bodyParser.json());
  // Middleware de autenticação
  app.use((req, res, next) => {
    //Exceto a rota para /apidoc
    const publicRoutes = [
      '/apidoc',
      '/apidoc/',
      'apidoc/index.html'
    ];

    if(req.path.startsWith('/apidoc')){
      return next();
    }

    // Bloqueia acesso para as rotas funcionais da api
    app.auth.authenticate(req, res, next);
  });
  // Middleware para remover o id do body
  app.use((req, res, next) => {
    if (req.body && req.body.id) {
      delete req.body.id;
    }
    next();
  });
  //apiDoc
  app.use(express.static('src/public'));
};
