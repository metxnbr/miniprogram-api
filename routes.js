const onLogin = require('./api/controllers/onLogin')
const secret = require('./api/controllers/secret')

module.exports = (app) => {
  app.post('/onLogin', onLogin)
  app.get('/secret', app.oauth, secret)
}