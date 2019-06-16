const fs = require("fs");

const jwt = require("jsonwebtoken");

var private = fs.readFileSync("./config/key/oauth-private.key");
var public = fs.readFileSync("./config/key/oauth-public.key");

const { sign, verify } = jwt;

const baseOptions = { algorithm: "RS256" };

module.exports = {
  sign: (data, options = {}) =>
    new Promise((resolve, reject) => {
      sign(data, private, { ...options, ...baseOptions }, function(err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    }),
  verify: (token, options = {}) =>
    new Promise((resolve, reject) => {
      verify(token, public, { ...options, ...baseOptions }, function(
        err,
        decoded
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    })
};
