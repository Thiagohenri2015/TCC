const Operacao = require('../model/Operacao');
const Item = require('../model/Item');
const Usuario = require('../model/Usuario');

module.exports = class OperacaoMiddleware {

    validar_CamposOperacao(request, response, next) {
        // Desestruturamos os dados da operação do corpo da requisição
        const { operacao } = request.body;
        const { item, usuario, codigoEvento } = operacao || {};

        // Validação do item
        if (!item || !item.idItem) {
            return response.status(200).send({
                status: false,
                msg: "O item da operação é obrigatório"
            });
        }

        // Validação do usuário
        if (!usuario || !usuario.idUsuario) {
            return response.status(200).send({
                status: false,
                msg: "O usuário da operação é obrigatório"
            });
        }

        // Validação do código do evento
        if (!codigoEvento || codigoEvento.length < 3) {
            return response.status(200).send({
                status: false,
                msg: "O código do evento deve ter pelo menos 3 caracteres"
            });
        }

        next();
    }

    // Exemplo de middleware para verificar se o item e usuário existem no banco
    async existe_ItemEUsuario(request, response, next) {
        const { operacao } = request.body;
        const { item, usuario } = operacao || {};

        if (!item || !item.idItem || !usuario || !usuario.idUsuario) {
            return response.status(200).send({
                status: false,
                msg: "Item e usuário são obrigatórios para esta verificação"
            });
        }

        // Verificar se o item existe
        const itemModel = new Item();
        itemModel.idItem = item.idItem;
        const itemEncontrado = await itemModel.readByID ? await itemModel.readByID() : null;
        if (!itemEncontrado) {
            return response.status(200).send({
                status: false,
                msg: "Item informado não existe"
            });
        }

        // Verificar se o usuário existe
        const usuarioModel = new Usuario();
        usuarioModel.idUsuario = usuario.idUsuario;
        const usuarioEncontrado = await usuarioModel.readByID ? await usuarioModel.readByID() : null;
        if (!usuarioEncontrado) {
            return response.status(200).send({
                status: false,
                msg: "Usuário informado não existe"
            });
        }

        next();
    }

}
