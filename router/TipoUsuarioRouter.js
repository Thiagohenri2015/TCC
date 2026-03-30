// Importa o módulo 'express' para criar o roteador.
const express = require('express');
// Importa o controller do TipoUsuario.
const TipoUsuarioControl = require('../control/TipoUsuarioControl');
// Importa o middleware do TipoUsuario.
const TipoUsuarioMiddleware = require('../middleware/TipoUsuarioMiddleware');

const autenticarToken = require('../middleware/JwtMiddleware');

// Exporta a classe TipoUsuarioRouter.
module.exports = class TipoUsuarioRouter {
    constructor() {
        // Instancia o roteador do Express.
        this._router = express.Router();
        // Instancia o controlador responsável pelas operações.
        this._tipoUsuarioControl = new TipoUsuarioControl();
        // Instancia os middlewares de validação.
        this._tipoUsuarioMiddleware = new TipoUsuarioMiddleware();
    }

    // Método que define e retorna as rotas para TipoUsuario.
    criarRotasTipoUsuario() {
        // Rota para listar todos os tipos de usuários.
        this._router.get('/',
            this._tipoUsuarioControl.tipoUsuario_read_all_control
        );

        // Rota para obter um tipo de usuário pelo ID.
        this._router.get('/:idTipoUsuario',
            this._tipoUsuarioControl.tipoUsuario_read_by_id_control
        );

        // Rota para criar um novo tipo de usuário.
        this._router.post('/',
            autenticarToken, 
            this._tipoUsuarioMiddleware.validar_NomeTipoUsuario,
            this._tipoUsuarioMiddleware.existe_NomeTipoUsuario_cadastrado,
            this._tipoUsuarioControl.tipoUsuario_create_control
        );

        // Rota para excluir um tipo de usuário pelo ID.
        this._router.delete('/:idTipoUsuario',
            autenticarToken, 
            this._tipoUsuarioControl.tipoUsuario_delete_control
        );

        // Rota para atualizar um tipo de usuário pelo ID.
        this._router.put('/:idTipoUsuario',
            autenticarToken, 
            this._tipoUsuarioControl.tipoUsuario_update_control
        );

        // Retorna as rotas configuradas.
        return this._router;
    }
}
