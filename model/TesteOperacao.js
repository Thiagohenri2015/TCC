const Operacao = require('./Operacao');
const Item = require('./Item');
const Usuario = require('./Usuario');

async function testarCriacaoOperacao() {
    const operacao = new Operacao();

    const item = new Item();
    item.idItem = 4; // Certifique-se que este ID existe no banco
    operacao.item = item;

    const usuario = new Usuario();
    usuario.idUsuario = 5; // Certifique-se que este ID existe no banco
    operacao.usuario = usuario;

    operacao.codigoEvento = 'ENTRADA TESTE';

    const sucesso = await operacao.create();

    if (sucesso) {
        console.log('Operação criada com sucesso! ID:', operacao.idOperacao);
    } else {
        console.log('Falha ao criar operação.');
    }
}

async function testarBuscarOperacaoPorID(idOperacao) {
    const operacao = new Operacao();
    operacao.idOperacao = idOperacao;

    const resultado = await operacao.readByID();

    if (resultado) {
        console.log('Operação encontrada:', resultado);
    } else {
        console.log('Nenhuma operação encontrada com o ID:', idOperacao);
    }
}

async function testarBuscarTodasOperacoes() {
    const operacao = new Operacao();

    const resultados = await operacao.readAll();

    if (resultados.length > 0) {
        console.log('Lista de operações encontradas:', resultados);
    } else {
        console.log('Nenhuma operação cadastrada no banco.');
    }
}

async function executarTodosOsTestes() {
    console.log('\n== TESTE DE CRIAÇÃO ==');
    await testarCriacaoOperacao();

    console.log('\n== TESTE DE BUSCA POR ID ==');
    await testarBuscarOperacaoPorID(1); // Altere o ID conforme seu banco

    console.log('\n== TESTE DE LISTAGEM GERAL ==');
    await testarBuscarTodasOperacoes();
}

executarTodosOsTestes();
