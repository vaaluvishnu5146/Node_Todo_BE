const { verifyJWTToken } = require("../users/users.utils");

/**
 * The middleware simply logs the incoming request
 */
function logRequest(request, response, next) {
    if(request) {
        console.log(request.method)
        next()
    }
}

/**
 * Checks whether Authorization token available in header
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns 
 */
async function checkTokenInHeader(request, response, next) {
    try {
        const token = request.headers['authorization'];
        if(token) {
            const isTokenValid = await verifyJWTToken(token);
            if(isTokenValid) {
                next()
            } else {
                return response.status(401).json({
                    error: "Token is expired",
                })
            }
        } else {
            return response.status(401).json({
                message: "Missing Token! Un authorized access"
            })
        }
    } catch (error) {
        return response.status(400).json({
            error: "Interal server error",
        })
    }
}

module.exports = {
    logRequest,
    checkTokenInHeader
};