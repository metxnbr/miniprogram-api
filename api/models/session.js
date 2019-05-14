const asyncConnect = require('../../utils/asyncConnect');

module.exports = {
  findByopenid: async (openid, columns = ['id']) => {
    const results = await asyncConnect('SELECT ?? FROM wx_session WHERE openid = ?', [columns, openid])

    return results
  },

  create: async (value) => {
    const results = asyncConnect('INSERT INTO wx_session SET ?', value)

    return results
  },

  update: async (columns) => {
    const results = asyncConnect('UPDATE wx_session SET session_key = ?, unionid = ? WHERE openid = ?', columns)

    return results
  },
}