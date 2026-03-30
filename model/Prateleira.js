const Banco = require('./Banco');

class Prateleira {
    constructor() {
        this._idPrateleira = null;
        this._descricao = null;
        this._quadra = null;
        this._lote = null;
        this._dataCadastro = null;
        this._dataUltimaAlteracao = null;
        this._lixeira = 0;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO tblPrateleiras (strDescricao, intQuadra, intLote, datDataCadastro, datDataUltimaAlteracao, intLixeira) VALUES (?, ?, ?, NOW(), NOW(), 0)';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._descricao, this._quadra, this._lote]);
            this._idPrateleira = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar a prateleira:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tblPrateleiras SET intLixeira = 1 WHERE idTblPrateleiras = ?';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idPrateleira]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar a prateleira:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tblPrateleiras SET strDescricao = ?, intQuadra = ?, intLote = ?, datDataUltimaAlteracao = NOW() WHERE idTblPrateleiras = ? AND intLixeira = 0';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._descricao, this._quadra, this._lote, this._idPrateleira]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar a prateleira:', error);
            return false;
        }
    }

    async isPrateleiraCadastrada() {
    const conexao = Banco.getConexao();
    const SQL = `SELECT COUNT(*) AS count FROM tblPrateleiras 
                 WHERE strDescricao = ? AND intQuadra = ? AND intLote = ? AND intLixeira = 0`;

    try {
        const [rows] = await conexao.promise().execute(SQL, [this._descricao, this._quadra, this._lote]);
        return rows[0].count > 0;
    } catch (error) {
        console.error('Erro ao verificar prateleira cadastrada:', error);
        return false;
    }
}

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblPrateleiras WHERE intLixeira = 0 ORDER BY strDescricao';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao listar prateleiras:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblPrateleiras WHERE idTblPrateleiras = ? and intlixeira = 0';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idPrateleira]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar prateleira por ID:', error);
            return null;
        }
    }

    // Getters e setters

    get idPrateleira() {
        return this._idPrateleira;
    }
    set idPrateleira(id) {
        this._idPrateleira = id;
    }

    get descricao() {
        return this._descricao;
    }
    set descricao(desc) {
        this._descricao = desc;
    }

    get quadra() {
        return this._quadra;
    }
    set quadra(q) {
        this._quadra = q;
    }

    get lote() {
        return this._lote;
    }
    set lote(l) {
        this._lote = l;
    }

    get dataCadastro() {
        return this._dataCadastro;
    }
    set dataCadastro(data) {
        this._dataCadastro = data;
    }

    get dataUltimaAlteracao() {
        return this._dataUltimaAlteracao;
    }
    set dataUltimaAlteracao(data) {
        this._dataUltimaAlteracao = data;
    }

    get lixeira() {
        return this._lixeira;
    }
    set lixeira(valor) {
        this._lixeira = valor;
    }
}

module.exports = Prateleira;