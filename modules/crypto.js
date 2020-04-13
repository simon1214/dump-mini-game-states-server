const crypto = require('crypto');

const encrypt = (plaintText) => {
  const encryptedPW = crypto
    .createHash('sha1')
    .update(`${plaintText}`)
    .digest('hex');

  return encryptedPW;
};

module.exports = encrypt;
