const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = function jwtMiddleware(req, res, next) {
    const tokenUtil = new MeuTokenJWT();

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ msg: "Token não informado" });
    }

    const valido = tokenUtil.validarToken(authHeader);
    if (!valido) {
        return res.status(401).json({ msg: "Token inválido ou expirado" });
    }

    // Se quiser, passa dados do payload para o request para usar nas rotas
    req.user = tokenUtil.getPayload();

    next();
};
