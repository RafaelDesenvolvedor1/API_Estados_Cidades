# 🇧🇷 API -- Estados e Cidades do Brasil

API REST construída em **Node.js**, utilizando **Express**,
**Sequelize**, **MySQL**, **JWT**, testes automatizados com
**Mocha/Chai**, e documentação gerada com **apiDoc**.

Este projeto tem como objetivo disponibilizar dados de **Estados** e
**Cidades brasileiras**, além de servir como estudo de arquitetura de
APIs, autenticação e testes automatizados.

## 🚀 Tecnologias Utilizadas

-   **Node.js** -- Ambiente de execução
-   **Express** -- Framework web
-   **Sequelize** -- ORM SQL
-   **MySQL** -- Banco de dados
-   **Passport + JWT** -- Autenticação
-   **Mocha + Chai** -- Testes automatizados
-   **apiDoc** -- Documentação da API
-   **Consign** -- Autoload das rotas, models e controllers

## 📌 Funcionalidades

### 🔐 Autenticação

-   Login via **JWT Bearer Token**
-   Rotas protegidas
-   Exceção configurada para `/apidoc` (documentação pública)

### 🌎 Estados

-   Listar todos os estados\
-   Buscar estado por **ID**
-   Buscar estado por **UF**
-   Criar, atualizar e deletar estados

### 🏙️ Cidades

-   Listar cidades de um estado
-   CRUD completo de cidades

### 🧪 Testes

-   Testes completos para rotas de estados e cidades\
-   Uso de banco dedicado para testes\
-   Reset automático das tabelas antes de cada suite

## 📁 Estrutura do Projeto

    src/
     ├── config/
     ├── controllers/
     ├── middlewares/
     ├── models/
     ├── public/         ← documentação gerada pelo apiDoc
     ├── routes/
     └── test/

## 📥 Instalação

``` bash
git clone https://github.com/RafaelDesenvolvedor1/API_Estados_Cidades.git
cd API_Estados_Cidades
npm install
```

Configure seu banco de dados no arquivo:

    src/config/config.js

## ▶️ Executar o servidor

``` bash
npm start
```

## 🧪 Executar os testes

``` bash
npm test
```

## 📘 Gerar documentação da API

``` bash
npm run apidoc
```

Os arquivos serão gerados em:

    src/public/

E você pode acessar pelo navegador em:

    http://localhost:3000/apidoc

## 🔑 Autenticação

A API utiliza **JWT Bearer Token**.

Exemplo de uso:

    Authorization: Bearer seu_token_aqui

A rota `/apidoc` é pública.

## 📜 Rotas Principais

### Status

    GET /

### Estados

    GET /estados
    GET /estados/:id
    GET /estados/uf/:uf
    POST /estados
    PUT /estados/:id
    DELETE /estados/:id

### Cidades

    GET /estados/:estadoId/cidades
    POST /cidades
    PUT /cidades/:id
    DELETE /cidades/:id

## 🧑‍💻 Autor

**Rafael Santos**\
Desenvolvedor Fullstack\
GitHub: https://github.com/RafaelDesenvolvedor1\
LinkedIn: https://www.linkedin.com/in/rafael-santos-06b5a719a/
