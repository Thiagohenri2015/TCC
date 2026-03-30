const Banco = require('./Banco'); // Importa o arquivo Banco.js da mesma pasta

// Obtém a conexão com o banco
const conexao = Banco.getConexao();

// Faz uma consulta simples para testar a conexão
conexao.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) {
        console.error('Erro ao executar a consulta:', err.message);
    } else {
        console.log('Conexão bem-sucedida! Resultado da consulta:', results[0].resultado);
    }
});
