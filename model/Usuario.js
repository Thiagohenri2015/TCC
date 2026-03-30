const Banco = require('./Banco');
const TipoUsuario = require('./TipoUsuario');

class Usuario {
    constructor() {
        this._idUsuario = null;
        this._nomeUsuario = null;
        this._email = null;
        this._cpf = null;
        this._senha = null;
        this._datDataCadastro = null;
        this._datDataUltimaAltercao = null;
        this._intLixeira = null;
        this._tipoUsuario = new TipoUsuario();
    }

    async create() {
    const conexao = Banco.getConexao();
    const SQL = 'INSERT INTO tblusuarios (strnome, stremail, strsenha, strcpf, TblTipoUsuarios_idTblTipoUsuarios, intLixeira, datDataCadastro, datDataUltimaAltercao) VALUES (?, ?, MD5(?), ?, ?, 0, NOW(), NOW())';

    try {
        const [result] = await conexao.promise().execute(SQL, [
            this._nomeUsuario,
            this._email,
            this._senha,
            this._cpf,
            this._tipoUsuario._idTipoUsuario, // Usando o getter que você já tem
        ]);
        
        this._idUsuario = result.insertId;
        return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro detalhado:', {
                message: error.message,
                sql: error.sql,
                parameters: [this._nomeUsuario, this._email, '***', this._cpf, this._tipoUsuario._idTipoUsuario]
            });
        return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tblusuarios SET intlixeira = 1 WHERE idtblusuario = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idUsuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o usuário:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE tblusuarios SET strnome=?, stremail=?, strsenha=MD5(?), strcpf=?, TblTipoUsuarios_idTblTipoUsuarios=? , datDataUltimaAltercao = NOW() WHERE idTblUsuario= ? AND intlixeira = 0;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeUsuario, this._email, this._senha, this._cpf, this._tipoUsuario._idTipoUsuario, this._idUsuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblusuarios WHERE intLixeira = 0 ORDER BY strNome;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler usuários:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM tblusuarios WHERE idtblusuario = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idUsuario]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao ler usuário pelo ID:', error);
            return null;
        }
    }

 async isEmailCadastrado() {
    const conexao = Banco.getConexao(); // Garante que estamos conectados
    const sql = "SELECT * FROM tblUsuarios WHERE strEmail = ? AND intLixeira = 0";
    const valores = [this._email]; // ou use this.email se preferir o getter

    try {
        const [rows] = await conexao.promise().query(sql, valores); // use .promise().query()
        return rows.length > 0;
    } catch (error) {
        console.error('Erro ao verificar se o e-mail está cadastrado:', error);
        return false;
    }
}



    async login() {
        const conexao = Banco.getConexao();
        const SQL = `
            SELECT COUNT(*) AS qtd, U.idTblUsuario, U.strNome, U.strEmail, TU.idTblTipoUsuarios, TU.strDescricao
            FROM tblUsuarios AS U
            JOIN tbltipousuarios AS TU ON U.TblTipoUsuarios_idTblTipoUsuarios = TU.idTblTipoUsuarios
            WHERE U.strEmail = ? AND U.strSenha = MD5(?);
        `;

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email, this._senha]);

            if (rows.length > 0 && rows[0].qtd === 1) {
                const tupla = rows[0];
                this._idUsuario = tupla.idTblUsuario;
                this._nomeUsuario = tupla.strNome;
                this._email = tupla.strEmail;
                this._tipoUsuario._idTipoUsuario = tupla.idTblTipoUsuarios;
                this._tipoUsuario._nomeTipoUsuario = tupla.strDescricao;

                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
            return false;
        }
    }

    // Getters e setters
    get idUsuario() {
        return this._idUsuario;
    }
    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario;
    }

    get nomeUsuario() {
        return this._nomeUsuario;
    }
    set nomeUsuario(nomeUsuario) {
        this._nomeUsuario = nomeUsuario;
    }

    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }

    get cpf() {
        return this._cpf;
    }
    set cpf(cpf) {
        this._cpf = cpf;
    }

    get senha() {
        return this._senha;
    }
    set senha(senha) {
        this._senha = senha;
    }

    get tipoUsuario() {
        return this._tipoUsuario;
    }
    set tipoUsuario(tipoUsuario) {
        this._tipoUsuario = tipoUsuario;
    }

    get datDataCadastro() {
        return this._datDataCadastro;
    }
    set datDataCadastro(datDataCadastro) {
        this._datDataCadastro = datDataCadastro;
    }

    get datDataUltimaAltercao() {
        return this._datDataUltimaAltercao;
    }
    set datDataUltimaAltercao(datDataUltimaAltercao) {
        this._datDataUltimaAltercao = datDataUltimaAltercao;
    }

    get intLixeira() {
        return this._intLixeira;
    }
    set intLixeira(intLixeira) {
        this._intLixeira = intLixeira;
    }
}

module.exports = Usuario;
