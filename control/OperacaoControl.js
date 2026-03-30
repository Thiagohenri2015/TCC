const express = require('express');
// Importa o modelo Operacao para realizar operações relacionadas à entidade.
const Operacao = require('../model/Operacao');

module.exports = class OperacaoControl {

    // Método para criar uma nova operação.
    async operacao_create_control(request, response) {
        const operacao = new Operacao();

        // Atribui os dados recebidos
        // Presumindo que request.body.operacao.item e .usuario sejam objetos com idItem e idUsuario
        operacao.item = request.body.operacao.item;
        operacao.usuario = request.body.operacao.usuario;
        operacao.codigoEvento = request.body.operacao.codigoEvento;

        const isCreated = await operacao.create();

        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Operação criada com sucesso' : 'Erro ao criar a operação'
        };

        response.status(200).send(objResposta);
    }

    // Método para excluir (soft delete) uma operação.
    async operacao_delete_control(request, response) {
        const operacao = new Operacao();
        operacao.idOperacao = request.params.idOperacao;

        const isDeleted = await operacao.delete();

        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Operação excluída com sucesso' : 'Erro ao excluir a operação'
        };

        response.status(200).send(objResposta);
    }

    // Método para atualizar uma operação.
    async operacao_update_control(request, response) {
        const operacao = new Operacao();
        operacao.idOperacao = request.params.idOperacao;
        operacao.item = request.body.operacao.item;
        operacao.usuario = request.body.operacao.usuario;
        operacao.codigoEvento = request.body.operacao.codigoEvento;
        // intLixeira não deve ser alterado aqui

        const isUpdated = await operacao.update();

        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Operação atualizada com sucesso' : 'Erro ao atualizar a operação'
        };

        response.status(200).send(objResposta);
    }

    // Método para obter todas as operações que não estão na lixeira.
    async operacao_read_all_control(request, response) {
        const operacao = new Operacao();
        const resultado = await operacao.readAll();

        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Consulta executada com sucesso',
            operacoes: resultado
        };

        response.status(200).send(objResposta);
    }

    // Método para obter uma operação por ID.
    async operacao_read_by_id_control(request, response) {
        const operacao = new Operacao();
        operacao.idOperacao = request.params.idOperacao;

        const resultado = await operacao.readByID();

        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Operação encontrada' : 'Operação não encontrada',
            operacao: resultado
        };

        response.status(200).send(objResposta);
    }
};
