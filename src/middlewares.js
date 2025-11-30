const bodyParser = require("body-parser");

module.exports = (app) => {
  app.set("port", process.env.PORT || 3000);
  app.set("json spaces", 4);
  app.use(bodyParser.json());
};
