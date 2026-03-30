const Banco = require('./Banco');
const Prateleira = require('./Prateleira');

class Item {
    constructor() {
        this._idItem = null;
        this._strNome = null;
        this._intTamanho = null;
        this._strCodigoRastreio = null;
        this._intQuantidade = null;
        this._datDataCadastro = null;
        this._datDataUltimaAlteracao = null;
        this._intLixeira = null;
        this._prateleira = new Prateleira();
    }

    async isCodigoRastreioCadastrado() {
        const sql = `
            SELECT COUNT(*) AS total 
            FROM tblItens 
            WHERE strCodigoRastreio = ? AND intLixeira = 0
        `;

        const valores = [this.strCodigoRastreio];

        try {
            const [result] = await con.query(sql, valores);
            return result[0].total > 0;
        } catch (error) {
            console.error('Erro ao verificar código de rastreio:', error);
            return false;
        }
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO tblItens (strNome, intTamanho, strCodigoRastreio, intQuantidade, datDataCadastro, datDataUltimaAlteracao, intLixeira, TblPrateleiras_idTblPrateleiras) VALUES (?, ?, ?, ?, NOW(), NOW(), 0, ?)';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._strNome,
                this._intTamanho,
                this._strCodigoRastreio,
                this._intQuantidade,
                this._prateleira.idPrateleira
            ]);

            this._idItem = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o item:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tblItens SET intLixeira = 1 WHERE idTblItens = ?';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idItem]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o item:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tblItens SET strNome=?, intTamanho=?, strCodigoRastreio=?, intQuantidade=?, TblPrateleiras_idTblPrateleiras=?, datDataUltimaAlteracao=NOW() WHERE idTblItens=? AND intLixeira=0';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._strNome,
                this._intTamanho,
                this._strCodigoRastreio,
                this._intQuantidade,
                this._prateleira.idPrateleira,
                this._idItem
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o item:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblItens WHERE intLixeira = 0 ORDER BY strNome';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler os itens:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblItens WHERE idTblItens = ? and intlixeira = 0';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idItem]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar o item por ID:', error);
            return null;
        }
    }

    // Getters e setters
    get idItem() {
        return this._idItem;
    }
    set idItem(idItem) {
        this._idItem = idItem;
    }

    get strNome() {
        return this._strNome;
    }
    set strNome(strNome) {
        this._strNome = strNome;
    }

    get intTamanho() {
        return this._intTamanho;
    }
    set intTamanho(intTamanho) {
        this._intTamanho = intTamanho;
    }

    get strCodigoRastreio() {
        return this._strCodigoRastreio;
    }
    set strCodigoRastreio(strCodigoRastreio) {
        this._strCodigoRastreio = strCodigoRastreio;
    }

    get intQuantidade() {
        return this._intQuantidade;
    }
    set intQuantidade(intQuantidade) {
        this._intQuantidade = intQuantidade;
    }

    get datDataCadastro() {
        return this._datDataCadastro;
    }
    set datDataCadastro(datDataCadastro) {
        this._datDataCadastro = datDataCadastro;
    }

    get datDataUltimaAlteracao() {
        return this._datDataUltimaAlteracao;
    }
    set datDataUltimaAlteracao(datDataUltimaAlteracao) {
        this._datDataUltimaAlteracao = datDataUltimaAlteracao;
    }

    get intLixeira() {
        return this._intLixeira;
    }
    set intLixeira(intLixeira) {
        this._intLixeira = intLixeira;
    }

    get prateleira() {
        return this._prateleira;
    }
    set prateleira(prateleira) {
        this._prateleira = prateleira;
    }
}

module.exports = Item;
