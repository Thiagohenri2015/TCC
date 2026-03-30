const Prateleira = require('../model/Prateleira');

module.exports = class PrateleiraControl {

    // Criar nova prateleira
    async prateleira_create_control(request, response) {
        const prateleira = new Prateleira();

        prateleira.descricao = request.body.prateleira.strDescricao;
        prateleira.quadra = request.body.prateleira.intQuadra;
        prateleira.lote = request.body.prateleira.intLote;

        prateleira.lixeira = 0; // Sempre 0 ao criar

        try {
            const isCreated = await prateleira.create();
            return response.status(200).send({
                status: isCreated,
                msg: isCreated ? 'Prateleira criada com sucesso' : 'Erro ao criar a prateleira'
            });
        } catch (error) {
            console.error('Erro em prateleira_create_control:', error);
            return response.status(500).send({
                status: false,
                msg: 'Erro interno ao criar prateleira'
            });
        }
    }

    // Soft delete da prateleira
    async prateleira_delete_control(request, response) {
        const prateleira = new Prateleira();
        prateleira.idPrateleira = request.params.idTblPrateleiras;

        try {
            const isDeleted = await prateleira.delete();
            return response.status(200).send({
                status: isDeleted,
                msg: isDeleted ? 'Prateleira excluída com sucesso' : 'Erro ao excluir a prateleira'
            });
        } catch (error) {
            console.error('Erro em prateleira_delete_control:', error);
            return response.status(500).send({
                status: false,
                msg: 'Erro interno ao excluir prateleira'
            });
        }
    }

    // Atualizar prateleira
    async prateleira_update_control(request, response) {
        const prateleira = new Prateleira();

        prateleira.idPrateleira = request.params.idTblPrateleiras;
        prateleira.descricao = request.body.prateleira.strDescricao;
        prateleira.quadra = request.body.prateleira.intQuadra;
        prateleira.lote = request.body.prateleira.intLote;
        // intLixeira não deve ser alterado aqui

        try {
            const isUpdated = await prateleira.update();
            return response.status(200).send({
                status: isUpdated,
                msg: isUpdated ? 'Prateleira atualizada com sucesso' : 'Erro ao atualizar a prateleira'
            });
        } catch (error) {
            console.error('Erro em prateleira_update_control:', error);
            return response.status(500).send({
                status: false,
                msg: 'Erro interno ao atualizar prateleira'
            });
        }
    }

    // Buscar todas as prateleiras (não na lixeira)
    async prateleira_read_all_control(request, response) {
        const prateleira = new Prateleira();

        try {
            const resultado = await prateleira.readAll();
            return response.status(200).send({
                status: true,
                msg: 'Consulta executada com sucesso',
                prateleiras: resultado
            });
        } catch (error) {
            console.error('Erro em prateleira_read_all_control:', error);
            return response.status(500).send({
                status: false,
                msg: 'Erro interno ao listar prateleiras',
                prateleiras: []
            });
        }
    }

    // Buscar prateleira por ID
    async prateleira_read_by_id_control(request, response) {
        const prateleira = new Prateleira();
        prateleira.idPrateleira = request.params.idTblPrateleiras;

        try {
            const resultado = await prateleira.readByID();
            return response.status(200).send({
                status: resultado ? true : false,
                msg: resultado ? 'Prateleira encontrada' : 'Prateleira não encontrada',
                prateleira: resultado
            });
        } catch (error) {
            console.error('Erro em prateleira_read_by_id_control:', error);
            return response.status(500).send({
                status: false,
                msg: 'Erro interno ao buscar prateleira',
                prateleira: null
            });
        }
    }
};
