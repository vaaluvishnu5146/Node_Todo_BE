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
            const decodedToken = await verifyJWTToken(token);
            if(decodedToken) {
                request.decodedToken = decodedToken;
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
            message: "Interal server error",
            error: error.message
        })
    }
}

async function checkIsUserAdmin(request, response, next) {
    try {
        console.log("HERE ===>", request.decodedToken)
        const token = request.decodedToken;
        if(token.role === 'admin') {
            next();
        } else {
            return response.status(401).json({
                message: "Un authorized access"
            })
        }
    } catch (error) {
        return response.status(400).json({
            message: "Interal server error",
            error: error.message
        })
    }
}

module.exports = {
    logRequest,
    checkTokenInHeader,
    checkIsUserAdmin
};