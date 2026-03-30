const express = require('express');
const OperacaoControl = require('../control/OperacaoControl');
const OperacaoMiddleware = require('../middleware/OperacaoMiddleware');

module.exports = class OperacaoRouter {
    constructor() {
        this._router = express.Router();
        this._operacaoControl = new OperacaoControl();
        this._operacaoMiddleware = new OperacaoMiddleware();
    }

    criarRotasOperacao() {
        this._router.get('/',
            this._operacaoControl.operacao_read_all_control
        );

        this._router.get('/:idOperacao',
            this._operacaoControl.operacao_read_by_id_control
        );

        this._router.post('/',
            this._operacaoMiddleware.validar_CamposOperacao,
            this._operacaoControl.operacao_create_control
        );

        this._router.delete('/:idOperacao',
            this._operacaoControl.operacao_delete_control
        );

        this._router.put('/:idOperacao',
            this._operacaoControl.operacao_update_control
        );

        return this._router;
    }
};
