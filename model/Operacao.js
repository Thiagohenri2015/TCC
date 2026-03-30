const Banco = require('./Banco');
const Usuario = require('./Usuario');
const Item = require('./Item');

class Operacao {
    constructor() {
        this._idOperacao = null;
        this._item = new Item();
        this._usuario = new Usuario();
        this._codigoEvento = null;
        this._datDataCadastro = null;
        this._datDataOperacao = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = `
            INSERT INTO tblOperacoes (
                tblitens_idtblItens,
                tblusuarios_idTblUsuario,
                strCodigoEvento,
                datDataCadastro,
                datDataOperacao
            ) VALUES (?, ?, ?, NOW(), NOW());
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._item.idItem,
                this._usuario.idUsuario,
                this._codigoEvento
            ]);
            this._idOperacao = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar operação:', error);
            return false;
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblOperacoes WHERE idTblOperacoes = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idOperacao]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar operação por ID:', error);
            return null;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblOperacoes ORDER BY datDataOperacao DESC;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar todas as operações:', error);
            return [];
        }
    }

    // Getters e Setters
    get idOperacao() {
        return this._idOperacao;
    }
    set idOperacao(idOperacao) {
        this._idOperacao = idOperacao;
    }

    get item() {
        return this._item;
    }
    set item(item) {
        this._item = item;
    }

    get usuario() {
        return this._usuario;
    }
    set usuario(usuario) {
        this._usuario = usuario;
    }

    get codigoEvento() {
        return this._codigoEvento;
    }
    set codigoEvento(codigoEvento) {
        this._codigoEvento = codigoEvento;
    }

    get datDataCadastro() {
        return this._datDataCadastro;
    }
    set datDataCadastro(datDataCadastro) {
        this._datDataCadastro = datDataCadastro;
    }

    get datDataOperacao() {
        return this._datDataOperacao;
    }
    set datDataOperacao(datDataOperacao) {
        this._datDataOperacao = datDataOperacao;
    }
}

module.exports = Operacao;
