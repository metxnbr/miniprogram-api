const crypto = require("crypto");
const miniprogram = require("../../config/env/miniprogram");

function wxDataCrypt({ rawData, session_key }) {
  const hash = crypto.createHash("sha1");

  hash.update(rawData + session_key);

  const signature = hash.digest("hex");

  return signature;
}

module.exports = async (req, res) => {
  const { results } = res.locals.oauth;
  const { signature, rawData } = req.body;

  const { session_key } = (results && results[0]) || {};

  const signature2 = wxDataCrypt({ rawData, session_key });

  if (signature2 === signature) {
    res.send("user");
  } else {
    res.send("error");
  }
};
