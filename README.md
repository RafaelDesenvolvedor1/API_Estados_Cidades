# 🇧🇷 API – Estados e Cidades do Brasil

API REST construída em **Node.js**, utilizando **Express**, **Sequelize** e **MySQL** (ou outro banco SQL configurado).  
A autenticação é feita via **Bearer Token** simples (middleware próprio). Não há login nem uso de JWT/Passport — o projeto usa um token estático/variável de ambiente verificado pelo middleware.

Este repositório serve como um projeto de estudo sobre organização de APIs, rotas, relacionamento entre models e testes automatizados.

---

## 🚀 Tecnologias e dependências principais

- **Node.js**
- **Express**
- **Sequelize**
- **MySQL / MariaDB / SQLite** (configurável)
- **dotenv** (variáveis de ambiente)
- **body-parser**
- **consign** (autoload de módulos)
- **apiDoc** (documentação gerada a partir de comentários)
- **Mocha + Chai + Supertest** (testes automatizados)

Consulte o `package.json` para a lista completa de dependências.

---

## 📁 Estrutura do projeto

```
src/
 ├── config/          # Configurações (DB, etc)
 ├── controllers/     # Lógica de cada rota
 ├── middlewares/     # Middleware de autenticação e outros
 ├── models/          # Models do Sequelize
 ├── routes/          # Definição de rotas
 ├── public/          # Arquivos públicos (ex: apidoc)
 └── test/            # Testes com Mocha/Chai/Supertest
index.js               # Inicialização do app
```

---

## 🔐 Autenticação

A API utiliza **autenticação por Bearer Token** via middleware próprio (ex.: `app.auth.authenticate`).  
**Não há rota de login** — o token é validado no middleware por comparação com um valor (ou lógica própria).  
Defina o token no ambiente (ex.: `API_TOKEN`) e envie no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

> Dica: para testes, defina `NODE_ENV=test` e use um token de teste em `process.env.API_TOKEN`.

---

## ▶️ Instalação e execução

1. Clone o repositório:
```bash
git clone https://github.com/RafaelDesenvolvedor1/API_Estados_Cidades.git
cd API_Estados_Cidades
```

2. Instale dependências:
```bash
npm install
```

3. Configure variáveis de ambiente (exemplo `.env`):
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=senha
DB_NAME=api_estados_cidades
API_TOKEN=seu_token_de_acesso
NODE_ENV=development
```

4. Gerar a documentação (opcional):
```bash
npm run apidoc
```

5. Iniciar a aplicação:
```bash
npm start
```

Acesse: `http://localhost:3000`  
Documentação: `http://localhost:3000/apidoc` (se gerada e servida)

---

## 🧪 Testes

Rode os testes automatizados com:

```bash
npm test
```

Observações:
- O script já configura `NODE_ENV=test` no `package.json` para facilitar o uso de um DB de testes.
- Os testes usam Mocha, Chai e Supertest.

---

## 📘 Sobre a documentação (apiDoc)

A documentação é gerada automaticamente a partir de comentários `@api` nas rotas:

- Comando para gerar: `npm run apidoc`
- Output: `src/public/apidoc` (por padrão)
- Para servir a documentação, o app deve usar algo como:
```js
app.use('/apidoc', express.static(path.join(__dirname, 'src/public/apidoc')));
```
ou servir `src/public` em geral.

---

## 🔎 Rotas principais (resumo)

### Status
```
GET /
```

### Estados
```
GET /estados
GET /estados/:id
GET /estados/:uf
GET /estados/:uf/cidades
GET /estados/cidades
GET /estados/count
GET /estados/search?nome=
POST /estados
PUT /estados/:id
DELETE /estados/:id
```

### Cidades
```
GET /cidades
GET /cidades/:id
GET /cidades/estado/:uf
GET /cidades/nome/:nome
GET /cidades/search?nome=
POST /cidades
PUT /cidades/:id
DELETE /cidades/:id
```

(Consulte a documentação gerada para exemplos de request/response)

---

## 💡 Boas práticas e observações

- Se usar chaves estrangeiras (`cidade.estado_uf` → `estado.uf`), crie estados antes de inserir cidades nos testes ou use `bulkCreate` para seeds.
- Deixe `/apidoc` pública para facilitar o consumo da API.
- No ambiente de testes, prefira usar um banco isolado ou SQLite in-memory para velocidade.
- Mantenha o token de teste separado (variável de ambiente `API_TOKEN`) e trate exceção no middleware para `NODE_ENV=test` se necessário.

---

## 🧑‍💻 Autor

**Rafael Santos**  
GitHub: https://github.com/RafaelDesenvolvedor1  
LinkedIn: https://www.linkedin.com/in/rafael-santos-06b5a719a/

---

## 📄 Licença

MIT
