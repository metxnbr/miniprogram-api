const miniprogram = require('../../config/env/miniprogram')
const sessionModel = require('../models/session')
const jwt = require('../../utils/jwt');

const axios = require('axios');

const getSession = async ({
  url,
  options
}) => {
  const json = await axios.get(url, options)
  const { openid, session_key, unionid, expires_in } = json && json.data || {}

  if (!(openid && session_key)) {
    throw { msg: '请求失败' }
  }

  return json.data
}

const findOpenId = async openid => {
  const { findByopenid } = sessionModel
  const results = await findByopenid(openid)
  const currentSessionId = results.length && results[0].id
  return currentSessionId
}

const updateSession = async ({
  data,
}) => {
  const { update } = sessionModel
  const results = await update(data);
  return results
}

const createSession = async (data) => {
  const { create } = sessionModel
  const results = await create(data);
  return results
}

const jwtToken = async data => {
  const token = await jwt.sign(data);
  return token
}

module.exports = async (req, res) => {
  const { appid, secret } = miniprogram

  const { code } = req.body

  const url = 'https://api.weixin.qq.com/sns/jscode2session'

  const options = {
    params: {
      appid,
      secret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  }

  try {
    const session = await getSession({
      url,
      options
    })

    const { openid, session_key, unionid, expires_in } = session

    const currentSessionId = await findOpenId(openid)

    if (currentSessionId) {
      // update
      await updateSession({
        data: [session_key, unionid, openid],
      })

      const access_token = await jwtToken({ openid, session_key })


      res.json({ access_token })

    } else {
      // create
      const { insertId: wx_session_id } = await createSession({
        openid,
        session_key,
        unionid: unionid || null
      })

      const access_token = await jwtToken({ openid, session_key })

      res.json({ access_token })
    }

  } catch (error) {
    res.json(error)
  }
}