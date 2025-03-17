const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const SECRET_KEY = "MANAGE_TASKS_SECRET";

async function createHashFromPassword(plainText = "") {
    try {
        const hash = await bcrypt.hash(plainText, saltRounds);
        return hash;
    } catch(error) {
        throw new Error(error)
    }
}

async function isPasswordMatching(plainText, hashText) {
    try {
        const result = await bcrypt.compare(plainText, hashText)
        console.log("=======>", result)
        return result;
    } catch(error) {
        throw new Error(error)
    }
}

async function createJWTToken(payload) {
    try {
        const token = await jwt.sign(payload, SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: '1h'
        })
        console.log(token)
        return token;
    } catch(error) {
        throw new Error(error)
    }
}

module.exports = {
    createHashFromPassword,
    isPasswordMatching,
    createJWTToken
};