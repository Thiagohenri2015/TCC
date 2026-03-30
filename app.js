// Importa o módulo 'express', que é um framework web para criar e configurar servidores HTTP.
const express = require('express');

const path = require('path');


// Importa os roteadores
const TipoUsuarioRouter = require('./router/TipoUsuarioRouter');
const UsuarioRouter = require('./router/UsuarioRouter');
const PrateleiraRouter = require('./router/PrateleiraRouter');
const ItemRouter = require('./router/ItemRouter'); 
const OperacaoRouter = require('./router/OperacaoRouter'); 

// Cria uma instância do servidor Express.
const app = express();

const cors = require('cors');
app.use(cors());

// Define a porta na qual o servidor vai escutar.
const portaServico = 80;

// Middleware para tratar JSON nas requisições.
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));

// Instancia e registra o roteador de TipoUsuario.
const tipoUsuarioRoteador = new TipoUsuarioRouter();
app.use('/tipos-usuarios', tipoUsuarioRoteador.criarRotasTipoUsuario());

// Instancia e registra o roteador de Usuario.
const usuarioRoteador = new UsuarioRouter();
app.use('/usuarios', usuarioRoteador.criarRotasUsuario());

// Instancia e registra o roteador de Prateleira.
const prateleiraRoteador = new PrateleiraRouter();
app.use('/prateleiras', prateleiraRoteador.criarRotasPrateleira());

// Instancia e registra o roteador de Item.
const itemRoteador = new ItemRouter(); 
app.use('/itens', itemRoteador.criarRotasItem()); 

// Instancia e registra o roteador de Operacao.
const operacaoRoteador = new OperacaoRouter(); 
app.use('/operacoes', operacaoRoteador.criarRotasOperacao()); 

// Rota para exibir a tela de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});

app.get('/usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Usuario.html'));
});

app.get('/tipos-usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tipoUsuario.html'));
});

app.get('/prateleira', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'prateleira.html'));
});

app.get('/item', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'item.html'));
});

app.get('/operacao', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'operacao.html'));
});


// Inicia o servidor e exibe no console o endereço da API.
app.listen(portaServico, () => {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});
