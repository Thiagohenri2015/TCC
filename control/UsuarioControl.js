const TipoUsuario = require('../model/TipoUsuario');
const express = require('express');
// Importa o modelo Usuario para realizar operações relacionadas à entidade.
const Usuario = require('../model/Usuario');

const MeuTokenJWT = require('../model/MeuTokenJWT');
const meuToken = new MeuTokenJWT();

module.exports = class UsuarioControl {

    // Método para criar um novo usuário.
    async usuario_create_control(request, response) {
        const usuario = new Usuario();
        usuario.nomeUsuario = request.body.usuario.nomeUsuario;
        usuario.email = request.body.usuario.email;
        usuario.cpf = request.body.usuario.cpf;
        usuario.senha = request.body.usuario.senha;
        const tipoUsuario = new TipoUsuario();
        tipoUsuario._idTipoUsuario = request.body.usuario.tipoUsuario.idTblTipoUsuarios;

        usuario.intLixeira = 0;  

        usuario.tipoUsuario = tipoUsuario;
        
        console.log('TipoUsuario configurado:', usuario.tipoUsuario);

        const isCreated = await usuario.create();

        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Usuário criado com sucesso' : 'Erro ao criar o usuário'
        };

        response.status(200).send(objResposta);
    }

    // Método para excluir (soft delete) um usuário.
    async usuario_delete_control(request, response) {
        const usuario = new Usuario();
        usuario.idUsuario = request.params.idUsuario;

        const isDeleted = await usuario.delete();

        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Usuário excluído com sucesso' : 'Erro ao excluir o usuário'
        };

        response.status(200).send(objResposta);
    }

    // Método para atualizar um usuário.
    async usuario_update_control(request, response) {
        console.log(request.params);
        const usuario = new Usuario();
        usuario.idUsuario = request.params.idUsuario;
        usuario.nomeUsuario = request.body.usuario.nomeUsuario;
        usuario.email = request.body.usuario.email;
        if (request.body.usuario.senha) {
            usuario.senha = request.body.usuario.senha;
        }
        usuario.cpf = request.body.usuario.cpf;
        const tipoUsuario = new TipoUsuario();
        tipoUsuario._idTipoUsuario = request.body.usuario.tipoUsuario.idTblTipoUsuarios;
        usuario.tipoUsuario = tipoUsuario;
        // intLixeira não deve ser alterado aqui

        const isUpdated = await usuario.update();

        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Usuário atualizado com sucesso' : 'Erro ao atualizar o usuário'
        };

        response.status(200).send(objResposta);
    }

    // Método para obter todos os usuários que não estão na lixeira.
    async usuario_read_all_control(request, response) {
        const usuario = new Usuario();
        const resultado = await usuario.readAll();

        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Consulta executada com sucesso',
            usuarios: resultado
        };

        response.status(200).send(objResposta);
    }

    // Método para obter um usuário por ID.
    async usuario_read_by_id_control(request, response) {
        const usuario = new Usuario();
        usuario.idUsuario = request.params.idUsuario;

        const resultado = await usuario.readByID();

        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Usuário encontrado' : 'Usuário não encontrado',
            usuario: resultado
        };

        response.status(200).send(objResposta);
    }

    // Método para verificar se o e-mail já está cadastrado.
    async usuario_is_email_cadastrado_control(request, response) {
        const usuario = new Usuario();
        usuario.email = request.body.usuario.email;

        const isCadastrado = await usuario.isEmailCadastrado();

        const objResposta = {
            cod: 1,
            status: isCadastrado,
            msg: isCadastrado ? 'E-mail já cadastrado' : 'E-mail disponível'
        };

        response.status(200).send(objResposta);
    }

    // Método para login de usuário.
    async usuario_login_control(request, response) {
    const usuario = new Usuario();
    usuario.email = request.body.usuario.email;
    usuario.senha = request.body.usuario.senha;

    const resultado = await usuario.login();

    if (resultado) {
        // Gerar token com dados do usuário (claims)
        const token = meuToken.gerarToken({
            email: resultado.email,
            role: resultado.tipoUsuario,  // ou resultado.tipoUsuario.idTipoUsuario
            name: resultado.nomeUsuario,
            idFuncionario: resultado.idUsuario
        });

        return response.status(200).send({
            cod: 1,
            status: true,
            msg: 'Login efetuado com sucesso',
            token,
            usuario: resultado
        });
    } else {
        return response.status(401).send({
            cod: 0,
            status: false,
            msg: 'Usuário ou senha inválidos',
            usuario: null
        });
    }
}
};
