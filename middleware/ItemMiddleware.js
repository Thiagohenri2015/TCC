const Item = require('../model/Item');

module.exports = class ItemMiddleware {

    // Validação dos campos do item
    validar_CamposItem(request, response, next) {
        const { item } = request.body;

        const {
            strNome,
            intTamanho,
            strCodigoRastreio,
            intQuantidade,
            prateleira
        } = item || {};

        if (!strNome || strNome.length < 3) {
            return response.status(200).send({
                status: false,
                msg: "O nome do item deve ter pelo menos 3 caracteres"
            });
        }

        if (!intTamanho || typeof intTamanho !== 'number' || intTamanho <= 0) {
            return response.status(200).send({
                status: false,
                msg: "O tamanho do item deve ser um número positivo"
            });
        }

        if (!strCodigoRastreio || strCodigoRastreio.length < 5) {
            return response.status(200).send({
                status: false,
                msg: "O código de rastreio deve ter pelo menos 5 caracteres"
            });
        }

        if (!intQuantidade || typeof intQuantidade !== 'number' || intQuantidade < 0) {
            return response.status(200).send({
                status: false,
                msg: "A quantidade do item deve ser um número igual ou maior que zero"
            });
        }

        if (!prateleira || !prateleira.idTblPrateleiras) {
            return response.status(200).send({
                status: false,
                msg: "A prateleira do item é obrigatória"
            });
        }

        next();
    }

    // Validação de código de rastreio já cadastrado (se necessário)
    async existe_CodigoRastreioCadastrado(request, response, next) {
        const { item } = request.body;
        const { strCodigoRastreio } = item || {};

        const novoItem = new Item();
        novoItem.strCodigoRastreio = strCodigoRastreio;

        const existe = await novoItem.isCodigoRastreioCadastrado?.();

        if (existe === true) {
            return response.status(200).send({
                status: false,
                msg: "Já existe um item cadastrado com esse código de rastreio"
            });
        }

        next();
    }
};
