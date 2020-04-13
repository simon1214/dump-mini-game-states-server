const crypto = require('crypto');

const encrypt = (plaintText) => {
  const encryptedPW = crypto.createHash('sha1').update(plaintext).digest('hex');

  return encryptedPW;
};

module.exports = encrypt;
