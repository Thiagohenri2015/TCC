# 📦 Sistema de Controle de Estoque

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

> Um sistema completo para gerenciamento de estoque, produtos, usuários e vendas com autenticação JWT e interface moderna.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato](#-contato)

## 🎯 Sobre o Projeto

O **Sistema de Controle de Estoque** é uma aplicação web completa desenvolvida para auxiliar empresas no gerenciamento eficiente de seus produtos, estoque e vendas. Com uma interface intuitiva e funcionalidades robustas, o sistema permite um controle total sobre o fluxo de produtos, desde o cadastro até a venda e acompanhamento de estoque.

### 🎨 Demonstração

![Dashboard do Sistema](https://via.placeholder.com/800x400?text=Dashboard+do+Sistema)
![Gerenciamento de Produtos](https://via.placeholder.com/800x400?text=Gerenciamento+de+Produtos)

### ✨ Destaques

- 📊 **Dashboard Interativo**: Visualização em tempo real do status do estoque
- 🔐 **Autenticação Segura**: Login com JWT e diferentes níveis de acesso
- 📦 **Controle de Produtos**: CRUD completo com categorias e fornecedores
- 📈 **Gestão de Estoque**: Controle de entrada e saída de produtos
- 💰 **Sistema de Vendas**: Registro de vendas com cálculo automático
- 👥 **Múltiplos Usuários**: Diferentes níveis de permissão (admin, vendedor, estoque)
- 🔍 **Relatórios**: Geração de relatórios de produtos, vendas e movimentações
- 📱 **Responsivo**: Interface adaptada para desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para construção da API
- **MySQL2** - Driver MySQL para Node.js
- **JSON Web Token (JWT)** - Autenticação e autorização
- **MD5/Bcrypt** - Hash para senhas
- **CORS** - Controle de acesso entre origens
- **Dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização personalizada e responsiva
- **Bootstrap 5** - Framework CSS responsivo
- **JavaScript ES6+** - Lógica e interatividade
- **Bootstrap Icons** - Ícones modernos
- **Fetch API** - Comunicação com o backend

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **GitHub** - Hospedagem do código
- **Postman/Insomnia** - Testes de API
- **MySQL Workbench** - Gerenciamento do banco de dados
- **VS Code** - IDE de desenvolvimento

## 🚀 Funcionalidades

### 👤 Usuários e Autenticação
- ✅ **Cadastro de usuários** com diferentes níveis de acesso
- ✅ **Login seguro** com validação de credenciais
- ✅ **Controle de permissões** baseado em tipo de usuário
- ✅ **Recuperação de senha** (implementação opcional)

### 📦 Produtos
- ✅ **Cadastro completo** com nome, descrição, preço e quantidade
- ✅ **Categorias de produtos** para melhor organização
- ✅ **Fornecedores** vinculados aos produtos
- ✅ **Busca avançada** por nome, categoria ou fornecedor
- ✅ **Atualização de preços** em lote
- ✅ **Controle de estoque mínimo** com alertas

### 📊 Estoque
- ✅ **Entrada de produtos** com registro de quantidade e data
- ✅ **Saída de produtos** vinculada a vendas
- ✅ **Histórico de movimentações** completo
- ✅ **Relatórios de estoque** baixo e produtos em falta
- ✅ **Ajuste manual de estoque** para correções

### 💰 Vendas
- ✅ **Registro de vendas** com múltiplos produtos
- ✅ **Cálculo automático** de subtotal, impostos e total
- ✅ **Controle de pagamentos** (dinheiro, cartão, pix)
- ✅ **Histórico de vendas** por período
- ✅ **Relatórios de vendas** diários, mensais e anuais
- ✅ **Cancelamento de vendas** com reversão de estoque

### 📈 Relatórios
- ✅ **Relatório de produtos** mais vendidos
- ✅ **Relatório de estoque** atual
- ✅ **Relatório de vendas** por período
- ✅ **Relatório de movimentações** de estoque
- ✅ **Exportação** para CSV/PDF

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [MySQL](https://www.mysql.com/) (versão 8.x ou superior)
- [Git](https://git-scm.com/)
- Navegador web moderno (Chrome, Firefox, Edge)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Thiagohenri2015/TCC.git
cd controle-estoque
