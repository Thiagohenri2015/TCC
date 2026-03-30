const Usuario = require('./Usuario');
const TipoUsuario = require('./TipoUsuario');

async function testarUsuario() {
    // Criação de um novo tipo de usuário
    const tipoUsuario = new TipoUsuario();
    tipoUsuario.idTipoUsuario = 1; 

    // Criar novo usuário
    const usuario = new Usuario();
    usuario.nomeUsuario = "João da Silva";
    usuario.email = "joao.silva@example.com";
    usuario.cpf = "12345678901";
    usuario.senha = "senha123";
    usuario.tipoUsuario = tipoUsuario;

    const criado = await usuario.create();
    console.log('Usuário criado com sucesso?', criado);
    console.log('ID do novo usuário:', usuario.idUsuario);

    // Ler todos os usuários
    const lista = await usuario.readAll();
    console.log('Usuários cadastrados:', lista);

    // Atualizar usuário
    usuario.nomeUsuario = "João Silva Alterado";
    const atualizado = await usuario.update();
    console.log('Usuário atualizado com sucesso?', atualizado);

    // Buscar por ID
    const usuarioBuscado = await usuario.readByID();
    console.log('Usuário buscado por ID:', usuarioBuscado);

    // Testar login
    const loginUsuario = new Usuario();
    loginUsuario.email = "joao.silva@example.com";
    loginUsuario.senha = "senha123";

    const loginOk = await loginUsuario.login();
    console.log('Login realizado com sucesso?', loginOk);

    // Marcar como deletado (intLixeira = 1)
    const deletado = await usuario.delete();
    console.log('Usuário enviado para lixeira?', deletado);
}

// Executa a função de teste
testarUsuario();
