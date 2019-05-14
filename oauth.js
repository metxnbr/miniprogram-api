const jwt = require('./utils/jwt');
const asyncConnect = require('./utils/asyncConnect');
const sessionModel = require('./api/models/session')

const unauthorized = res => {
  res.sendStatus(401)
}

module.exports = async (req, res, next) => {
  const accessToken = req && req.headers && req.headers['authorization']

  if(accessToken) {
    const jwtDecoded = await jwt.verify(accessToken)

    const { openid, session_key } = jwtDecoded
  
    const { findByopenid } = sessionModel
  
    const results = await findByopenid(openid, ['session_key'])
  
    if(session_key === results[0].session_key) {
      next()
    } else {
      unauthorized(res)
    }
    
    return // break
  }

  unauthorized(res)
}

