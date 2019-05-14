const fs = require('fs');

const jwt = require('jsonwebtoken');

var private = fs.readFileSync('./config/key/oauth-private.key');
var public = fs.readFileSync('./config/key/oauth-public.key');

const { sign, verify } = jwt

const options = { algorithm: 'RS256' }

module.exports = {
  sign: (data) => new Promise((resolve, reject) => {
    sign(data, private, options, function (err, token) {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    });
  }),
  verify: (token) => new Promise((resolve, reject) => {
    verify(token, public, options, function (err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    });
  })
}