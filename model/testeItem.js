const Item = require('./Item');
const Prateleira = require('./Prateleira');

async function testarItem() {
    // Criar prateleira fictícia (ou use uma já existente)
    const prateleira = new Prateleira();
    prateleira.idPrateleira = 1; // Certifique-se que essa prateleira existe no banco

    // Criar novo item
    const item = new Item();
    item.strNome = "Vela Aromática Lavanda";
    item.intTamanho = 250;
    item.strCodigoRastreio = "ABC123XYZ";
    item.intQuantidade = 10;
    item.prateleira = prateleira;

    const criado = await item.create();
    console.log('Item criado com sucesso?', criado);
    console.log('ID do novo item:', item.idItem);

    // Ler todos os itens
    const lista = await item.readAll();
    console.log('Itens cadastrados:', lista);

    // Atualizar item
    item.strNome = "Vela Aromática Lavanda Alterada";
    item.intQuantidade = 20;
    const atualizado = await item.update();
    console.log('Item atualizado com sucesso?', atualizado);

    // Buscar por ID
    const itemBuscado = await item.readByID();
    console.log('Item buscado por ID:', itemBuscado);

    // Marcar como deletado (intLixeira = 1)
    const deletado = await item.delete();
    console.log('Item enviado para lixeira?', deletado);
}

// Executa a função de teste
testarItem();
