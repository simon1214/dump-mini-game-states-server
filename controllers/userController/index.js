const userSignFunctions = require('./userSignFunctions');
const userCheckDuplicates = require('./userCheckDuplicates');

module.exports = {
  signin: userSignFunctions.signin,
  signout: userSignFunctions.signout,
  signup: userSignFunctions.signup,
  checkDuplicateID: userCheckDuplicates.checkDuplicateID,
  checkDuplicateNickname: userCheckDuplicates.checkDuplicateNickname,
};
