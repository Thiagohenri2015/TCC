const Banco = require('./Banco');

class TipoUsuario {
    constructor() {
        this.idTipoUsuario = null;
        this.nomeTipoUsuario = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO tbltipousuarios (strDescricao) VALUES (?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [this.nomeTipoUsuario]);
            this.idTipoUsuario = result.insertId;  // Corrigido aqui
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o Tipo de usuario:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM tbltipousuarios WHERE idTblTipoUsuarios = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this.idTipoUsuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o Tipo de usuario:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tbltipousuarios SET strDescricao=? WHERE idTblTipoUsuarios=?';

        try {
            const [result] = await conexao.promise().execute(SQL, [this.nomeTipoUsuario, this.idTipoUsuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o Tipo de usuario:', error);
            return false;
        }
    }

    async isTipoUsuario() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM tbltipousuarios WHERE strDescricao =?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this.nomeTipoUsuario]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o Tipo de usuario:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tbltipousuarios ORDER BY strDescricao';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler o Tipo de usuario:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tbltipousuarios WHERE idTblTipoUsuarios = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this.idTipoUsuario]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler o Tipo de usuario pelo ID:', error);
            return null;
        }
    }

    // Getters e Setters com nomes distintos dos atributos internos
    get _idTipoUsuario() {
        return this.idTipoUsuario;
    }

    set _idTipoUsuario(value) {
        this.idTipoUsuario = value;
        return this;
    }

    get _nomeTipoUsuario() {
        return this.nomeTipoUsuario;
    }

    set _nomeTipoUsuario(value) {
        this.nomeTipoUsuario = value;
        return this;
    }
}

module.exports = TipoUsuario;
