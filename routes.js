const onLogin = require("./api/controllers/onLogin");
const user = require("./api/controllers/user");
const secret = require("./api/controllers/secret");

module.exports = app => {
  app.post("/onLogin", onLogin);
  app.post("/user", app.oauth, user);
  app.get("/secret", app.oauth, secret);
};
