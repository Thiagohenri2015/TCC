const express = require('express');
const ItemControl = require('../control/ItemControl');
const ItemMiddleware = require('../middleware/ItemMiddleware');
const autenticarToken = require('../middleware/JwtMiddleware');

module.exports = class ItemRouter {
    constructor() {
        this._router = express.Router();
        this._itemControl = new ItemControl();
        this._itemMiddleware = new ItemMiddleware();
    }

    criarRotasItem() {
        this._router.get('/',
            this._itemControl.item_read_all_control
        );

        this._router.get('/:idItem',
            this._itemControl.item_read_by_id_control
        );

        this._router.post('/',
            autenticarToken,
            this._itemMiddleware.validar_CamposItem,
            this._itemMiddleware.existe_CodigoRastreioCadastrado,
            this._itemControl.item_create_control
        );

        this._router.delete('/:idItem',
            autenticarToken,
            this._itemControl.item_delete_control
        );

        this._router.put('/:idItem',
            autenticarToken,
            this._itemControl.item_update_control
        );

        this._router.post('/codigo-rastreio-cadastrado',
            this._itemControl.item_is_codigo_rastreio_cadastrado_control
        );

        return this._router;
    }
};
