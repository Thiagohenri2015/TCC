const Prateleira = require('../model/Prateleira');

module.exports = class PrateleiraMiddleware {

    validar_CamposPrateleira(request, response, next) {
        const { prateleira } = request.body;
        const { strDescricao, intQuadra, intLote } = prateleira || {};

        if (!strDescricao || strDescricao.length < 3) {
            return response.status(200).send({
                status: false,
                msg: "A descrição da prateleira deve ter pelo menos 3 caracteres"
            });
        }

        if (intQuadra === undefined || isNaN(intQuadra) || intQuadra <= 0) {
            return response.status(200).send({
                status: false,
                msg: "A quadra deve ser um número maior que zero"
            });
        }

        if (intLote === undefined || isNaN(intLote) || intLote <= 0) {
            return response.status(200).send({
                status: false,
                msg: "O lote deve ser um número maior que zero"
            });
        }

        next();
    }

    async existe_Prateleira(request, response, next) {
        const { prateleira } = request.body;
        const { strDescricao, intQuadra, intLote } = prateleira || {};

        const prateleiraModel = new Prateleira();
        prateleiraModel.descricao = strDescricao;
        prateleiraModel.quadra = intQuadra;
        prateleiraModel.lote = intLote;

        try {
            const existe = await prateleiraModel.isPrateleiraCadastrada();

            if (existe) {
                return response.status(200).send({
                    status: false,
                    msg: "Já existe uma prateleira cadastrada com essa descrição, quadra e lote"
                });
            }

            next();
        } catch (error) {
            console.error('Erro no middleware existe_Prateleira:', error);
            return response.status(500).send({
                status: false,
                msg: "Erro ao verificar prateleira cadastrada"
            });
        }
    }
}
