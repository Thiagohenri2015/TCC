const Item = require('../model/Item');

module.exports = class ItemControl {

    // Criar novo item
    async item_create_control(request, response) {
        const item = new Item();
        item.strNome = request.body.item.strNome;
        item.intTamanho = request.body.item.intTamanho;
        item.strCodigoRastreio = request.body.item.strCodigoRastreio;
        item.intQuantidade = request.body.item.intQuantidade;
        item.datDataCadastro = new Date();
        item.intLixeira = 0;

        // Ajuste aqui: idTblPrateleiras do JSON vai para idPrateleira do objeto Prateleira
        if (request.body.item.prateleira && request.body.item.prateleira.idTblPrateleiras) {
            item.prateleira.idPrateleira = request.body.item.prateleira.idTblPrateleiras;
        } else {
            return response.status(400).json({
                cod: 0,
                status: false,
                msg: 'A prateleira do item é obrigatória'
            });
        }

        const isCreated = await item.create();

        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Item criado com sucesso' : 'Erro ao criar o item'
        };

        response.status(200).send(objResposta);
    }

    // Excluir item (soft delete)
    async item_delete_control(request, response) {
        const item = new Item();
        item.idItem = request.params.idItem;

        const isDeleted = await item.delete();

        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Item excluído com sucesso' : 'Erro ao excluir o item'
        };

        response.status(200).send(objResposta);
    }

    // Atualizar item
    async item_update_control(request, response) {
        const item = new Item();
        item.idItem = request.params.idItem;
        item.strNome = request.body.item.strNome;
        item.intTamanho = request.body.item.intTamanho;
        item.strCodigoRastreio = request.body.item.strCodigoRastreio;
        item.intQuantidade = request.body.item.intQuantidade;
        item.datDataUltimaAlteracao = new Date();

        if (request.body.item.prateleira && request.body.item.prateleira.idTblPrateleiras) {
            item.prateleira.idPrateleira = request.body.item.prateleira.idTblPrateleiras;
        } else {
            return response.status(400).json({
                cod: 0,
                status: false,
                msg: 'A prateleira do item é obrigatória'
            });
        }

        const isUpdated = await item.update();

        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Item atualizado com sucesso' : 'Erro ao atualizar o item'
        };

        response.status(200).send(objResposta);
    }

    // Buscar todos os itens (exceto os que estão na lixeira)
    async item_read_all_control(request, response) {
        const item = new Item();
        const resultado = await item.readAll();

        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Consulta executada com sucesso',
            itens: resultado
        };

        response.status(200).send(objResposta);
    }

    // Buscar item por ID
    async item_read_by_id_control(request, response) {
        const item = new Item();
        item.idItem = request.params.idItem;

        const resultado = await item.readByID();

        const objResposta = {
            cod: 1,
            status: !!resultado,
            msg: resultado ? 'Item encontrado' : 'Item não encontrado',
            item: resultado
        };

        response.status(200).send(objResposta);
    }

    // Verificar se código de rastreio está cadastrado
    async item_is_codigo_rastreio_cadastrado_control(request, response) {
        const item = new Item();
        item.strCodigoRastreio = request.body.item.strCodigoRastreio;

        const isCadastrado = await item.isCodigoRastreioCadastrado();

        const objResposta = {
            cod: 1,
            status: isCadastrado,
            msg: isCadastrado ? 'Código de rastreio já cadastrado' : 'Código disponível'
        };

        response.status(200).send(objResposta);
    }
};
