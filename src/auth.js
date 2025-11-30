const { API_TOKEN } = require('./token')
module.exports =  {

  authenticate: (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || token !== API_TOKEN) {
      return res.status(401).json({ error: "Token inválido" });
    }

    next();
  }
};
