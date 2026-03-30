const express = require('express');
// Importa o modelo TipoUsuario para realizar operações relacionadas à entidade.
const TipoUsuario = require('../model/TipoUsuario');

// Exporta a classe TipoUsuarioControl, que controla as operações de CRUD para TipoUsuario.
module.exports = class TipoUsuarioControl {
    
    // Método para criar um novo tipo de usuário.
    async tipoUsuario_create_control(request, response) {
        const tipoUsuario = new TipoUsuario();
        tipoUsuario.nomeTipoUsuario = request.body.tipoUsuario.nomeTipoUsuario;

        const isCreated = await tipoUsuario.create();

        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Tipo de usuário criado com sucesso' : 'Erro ao criar o tipo de usuário'
        };

        response.status(200).send(objResposta);
    }

    // Método para excluir um tipo de usuário.
    async tipoUsuario_delete_control(request, response) {
        const tipoUsuario = new TipoUsuario();
        tipoUsuario.idTipoUsuario = request.params.idTipoUsuario;

        const isDeleted = await tipoUsuario.delete();

        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Tipo de usuário excluído com sucesso' : 'Erro ao excluir o tipo de usuário'
        };

        response.status(200).send(objResposta);
    }

    // Método para atualizar um tipo de usuário.
    async tipoUsuario_update_control(request, response) {
        console.log('request.body:', request.body);
        const tipoUsuario = new TipoUsuario();
        tipoUsuario.idTipoUsuario = request.params.idTipoUsuario;
        tipoUsuario.nomeTipoUsuario = request.body.tipoUsuario.nomeTipoUsuario;

        const isUpdated = await tipoUsuario.update();

        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Tipo de usuário atualizado com sucesso' : 'Erro ao atualizar o tipo de usuário'
        };

        response.status(200).send(objResposta);
    }

    // Método para obter todos os tipos de usuários.
    async tipoUsuario_read_all_control(request, response) {
        const tipoUsuario = new TipoUsuario();
        const resultado = await tipoUsuario.readAll();

        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Consulta executada com sucesso',
            tiposUsuarios: resultado
        };

        response.status(200).send(objResposta);
    }

    // Método para obter um tipo de usuário por ID.
    async tipoUsuario_read_by_id_control(request, response) {
        const tipoUsuario = new TipoUsuario();
        tipoUsuario.idTipoUsuario = request.params.idTipoUsuario;

        const resultado = await tipoUsuario.readByID();

        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Tipo de usuário encontrado' : 'Tipo de usuário não encontrado',
            tipoUsuario: resultado
        };

        response.status(200).send(objResposta);
    }
};
