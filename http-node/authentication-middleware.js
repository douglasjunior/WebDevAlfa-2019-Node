const jwt = require('jsonwebtoken')

const chaveJwt = 'Z_dtTp>?#C*ae/EBn=q~Jq?^cb5^S{KdcCYrjgWX{6PfY3K?&'

function verifyToken(req, res, next) {
    const token = req.headers.authorization

    try {
        const payload = jwt.verify(token, chaveJwt)
        req.usuario = payload
        next()
    } catch (error) {
        console.log(error)
        res.status(403).send('Autenticação inválida')
    }
}

function signToken(email) {
    return jwt.sign({ email }, chaveJwt)
}

module.exports = {
    verifyToken,
    signToken
}
