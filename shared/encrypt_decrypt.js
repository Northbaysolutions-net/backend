const config = require("../config/config");
var crypto = require("crypto");

encrypt = text => {

  var mykey = crypto.createCipher("aes-128-cbc", config.secret_key);
  var mystr = mykey.update(text, "utf8", "hex");
  mystr += mykey.final("hex");

  return mystr;
};

decrypt = text => {

  let mykey = crypto.createDecipher("aes-128-cbc", config.secret_key);
  let mystr = mykey.update(text, "hex", "utf8");
  mystr += mykey.final("utf8");

  return mystr;
};

module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
