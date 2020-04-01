const crypto = require("crypto");
require("dotenv").config();



const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = text => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipher(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString("hex");
};

module.exports={encrypt}