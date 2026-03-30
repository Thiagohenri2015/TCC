const Prateleira = require('./Prateleira');
const Banco = require('./Banco'); 

async function testarPrateleira() {
    const prateleira = new Prateleira();

    // Dados de teste
    prateleira.descricao = 'Prateleira A';
    prateleira.quadra = 1;
    prateleira.lote = 10;

    console.log('Criando prateleira...');
    const criada = await prateleira.create();
    console.log('Prateleira criada?', criada);
    console.log('ID gerado:', prateleira.idTblPrateleiras);

    // Teste de leitura por ID
    console.log('\nLendo prateleira por ID...');
    const prateleiraLida = await prateleira.readByID();
    console.log('Resultado:', prateleiraLida);

    // Atualizando descrição
    prateleira.strDescricao = 'Prateleira A - Atualizada';
    console.log('\nAtualizando prateleira...');
    const atualizada = await prateleira.update();
    console.log('Prateleira atualizada?', atualizada);

    // Lendo todas as prateleiras
    console.log('\nLendo todas as prateleiras...');
    const todas = await prateleira.readAll();
    console.log(todas);

    // Deletando (soft delete)
    console.log('\nDeletando prateleira...');
    const deletada = await prateleira.delete();
    console.log('Prateleira deletada?', deletada);

    Banco.getConexao().end();
}

testarPrateleira();
