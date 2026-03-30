const express = require('express');
const UsuarioControl = require('../control/UsuarioControl');
const UsuarioMiddleware = require('../middleware/UsuarioMiddleware');
const autenticarToken = require('../middleware/JwtMiddleware');

module.exports = class UsuarioRouter {
    constructor() {
        this._router = express.Router();
        this._usuarioControl = new UsuarioControl();
        this._usuarioMiddleware = new UsuarioMiddleware();
    }

    criarRotasUsuario() {
        this._router.get('/',
            this._usuarioControl.usuario_read_all_control
        );

        this._router.get('/:idUsuario',
            this._usuarioControl.usuario_read_by_id_control
        );

        this._router.post('/',
            autenticarToken, 
            this._usuarioMiddleware.validar_CamposUsuario,
            this._usuarioMiddleware.existe_EmailCadastrado,
            this._usuarioControl.usuario_create_control
        );

        this._router.delete('/:idUsuario',
            autenticarToken,
            this._usuarioControl.usuario_delete_control
        );

        this._router.put('/:idUsuario',
            autenticarToken,
            this._usuarioControl.usuario_update_control
        );

        this._router.post('/email-cadastrado',
            this._usuarioControl.usuario_is_email_cadastrado_control
        );

        this._router.post('/login',
            this._usuarioControl.usuario_login_control
        );

        return this._router;
    }
};
