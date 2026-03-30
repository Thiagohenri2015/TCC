const express = require('express');
const PrateleiraControl = require('../control/PrateleiraControl');
const autenticarToken = require('../middleware/JwtMiddleware');

module.exports = class PrateleiraRouter {
    constructor() {
        this._router = express.Router();
        this._prateleiraControl = new PrateleiraControl();
    }

    criarRotasPrateleira() {
        this._router.get('/',
            this._prateleiraControl.prateleira_read_all_control
        );

        this._router.get('/:idTblPrateleiras',
            this._prateleiraControl.prateleira_read_by_id_control
        );

        this._router.post('/',
            autenticarToken,
            this._prateleiraControl.prateleira_create_control
        );

        this._router.delete('/:idTblPrateleiras',
            autenticarToken,
            this._prateleiraControl.prateleira_delete_control
        );

        this._router.put('/:idTblPrateleiras',
            autenticarToken,
            this._prateleiraControl.prateleira_update_control
        );

        return this._router;
    }
};
