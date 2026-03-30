const TipoUsuario = require('./TipoUsuario'); // importa a classe
const Banco = require('./Banco'); 

(async () => {
    const tipoUsuario = new TipoUsuario();

    // Testando inserção
    tipoUsuario._nomeTipoUsuario = 'adm';
    const criado = await tipoUsuario.create();
    console.log('Tipo de usuário criado?', criado);

    // Testando se o tipo de usuário existe
    const existe = await tipoUsuario.isTipoUsuario();
    console.log('Tipo de usuário já existe?', existe);

    // Testando leitura de todos os tipos de usuário
    const lista = await tipoUsuario.readAll();
    console.log('Lista de tipos de usuário:', lista);

    // Testando leitura por ID
    const idCriado = tipoUsuario._idTipoUsuario; // obtido após o create
    tipoUsuario._idTipoUsuario = idCriado; // redundante, mas mantido para clareza
    const tipoUsuarioPorID = await tipoUsuario.readByID();
    console.log('Tipo de usuário pelo ID:', tipoUsuarioPorID);

    // Testando atualização
    tipoUsuario._nomeTipoUsuario = 'Gestor';
    const atualizado = await tipoUsuario.update();
    console.log('Tipo de usuário atualizado?', atualizado);

    // Testando exclusão
    const deletado = await tipoUsuario.delete();
    console.log('Tipo de usuário deletado?', deletado);

    // Encerra a conexão com o banco
    Banco.getConexao().end();
})();
