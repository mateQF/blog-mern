const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const secret = process.env.JWT_SECRET;
const signAsync = promisify(jwt.sign);

async function createAccessToken(payload) {
  try {
    const token = await signAsync(payload, secret, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw new Error("Error creating access token");
  }
}

module.exports = createAccessToken;
