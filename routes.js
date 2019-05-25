const onLogin = require("./api/controllers/onLogin");
const user = require("./api/controllers/user");
const secret = require("./api/controllers/secret");
const uploadFile = require("./api/controllers/uploadFile");

module.exports = app => {
  app.post("/onLogin", onLogin);
  app.post("/user", app.oauth, user);
  app.get("/secret", app.oauth, secret);
  app.post("/upload/file", app.oauth, uploadFile);
};
