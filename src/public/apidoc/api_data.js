define({ "api": [
  {
    "type": "delete",
    "url": "/cidades/:id",
    "title": "Remover Cidade",
    "group": "Cidades",
    "description": "<p>Remove uma cidade permanentemente.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID da cidade.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>Remoção bem-sucedida (sem retorno de conteúdo).</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Falha na remoção ou erro interno.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "DeleteCidadesId"
  },
  {
    "type": "get",
    "url": "/cidades",
    "title": "Listar todas as Cidades",
    "group": "Cidades",
    "description": "<p>Retorna uma lista de todas as cidades cadastradas.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "cidades",
            "description": "<p>Lista de objetos de cidade.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n[\n{ \"id\": 1, \"nome\": \"São Paulo\", \"estado_uf\": \"SP\" },\n// ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "GetCidades"
  },
  {
    "type": "get",
    "url": "/cidades/count",
    "title": "Contagem de Cidades",
    "group": "Cidades",
    "description": "<p>Retorna a quantidade total de cidades cadastradas.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "qtd_cidades",
            "description": "<p>Quantidade total de cidades.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\"qtd_cidades\": 5570\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Falha na conexão ou erro interno.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "GetCidadesCount"
  },
  {
    "type": "get",
    "url": "/cidades/estado/:uf",
    "title": "Cidades por UF",
    "group": "Cidades",
    "description": "<p>Retorna uma lista de cidades pertencentes à sigla (UF) informada.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla do estado (Ex: SP, MG) passada na URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de Uso:",
          "content": "/cidades/estado/RJ",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "cidades",
            "description": "<p>Lista de cidades encontradas.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n[\n{ \"id\": 201, \"nome\": \"Niterói\", \"estado_uf\": \"RJ\" },\n// ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Erro interno do servidor.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "GetCidadesEstadoUf"
  },
  {
    "type": "get",
    "url": "/cidades/:id",
    "title": "Buscar Cidade por ID",
    "group": "Cidades",
    "description": "<p>Retorna uma cidade específica baseada no ID.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID da cidade.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "cidade",
            "description": "<p>Objeto da cidade.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n{ \"id\": 123, \"nome\": \"Curitiba\", \"estado_uf\": \"PR\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 404": [
          {
            "group": "Erro 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Cidade não encontrada.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "GetCidadesId"
  },
  {
    "type": "get",
    "url": "/cidades/nome/:nome",
    "title": "Buscar Cidade por Nome",
    "group": "Cidades",
    "description": "<p>Retorna uma cidade específica com base no nome exato fornecido.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da cidade.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de Uso:",
          "content": "/cidades/nome/Curitiba",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "cidade",
            "description": "<p>Objeto da cidade encontrada.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n{ \"id\": 123, \"nome\": \"Curitiba\", \"estado_uf\": \"PR\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 404": [
          {
            "group": "Erro 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Cidade não encontrada com o nome fornecido.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "GetCidadesNomeNome"
  },
  {
    "type": "get",
    "url": "/cidades/search",
    "title": "Busca Cidades (LIKE)",
    "group": "Cidades",
    "description": "<p>Busca cidades cujo nome contenha o termo fornecido (Query Parameter 'nome').</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Termo de busca para o nome da cidade. (Query Parameter)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de Uso:",
          "content": "/cidades/search?nome=São",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "cidades",
            "description": "<p>Lista de cidades que correspondem ao critério de busca.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n[ { \"id\": 1, \"nome\": \"São Paulo\", \"estado_uf\": \"SP\" }, ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 400": [
          {
            "group": "Erro 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>O parâmetro 'nome' é obrigatório ou está vazio.</p>"
          }
        ],
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Outras falhas de validação ou erro interno.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "GetCidadesSearch"
  },
  {
    "type": "post",
    "url": "/cidades",
    "title": "Criar uma nova Cidade",
    "group": "Cidades",
    "description": "<p>Cadastra uma nova cidade no banco de dados.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "nome",
        "description": "<p>Nome da cidade. (Obrigatório)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "estado_uf",
        "description": "<p>Sigla do estado a que a cidade pertence. (Obrigatório)</p>"
      }
    ],
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID gerado para a cidade.</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da cidade.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 201 Created:",
          "content": "HTTP/1.1 201 Created\n{ \"id\": 5571, \"nome\": \"Exemplo\", \"estado_uf\": \"SP\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Falha na validação ou campo obrigatório não enviado.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "PostCidades"
  },
  {
    "type": "put",
    "url": "/cidades/:id",
    "title": "Atualizar Cidade",
    "group": "Cidades",
    "description": "<p>Atualiza os dados de uma cidade.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID da cidade.</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "nome",
        "description": "<p>Nome da cidade.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "estado_uf",
        "description": "<p>Sigla do estado.</p>"
      }
    ],
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>Atualização bem-sucedida (sem retorno de conteúdo).</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Falha na validação ou erro interno.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/cidade.js",
    "groupTitle": "Cidades",
    "name": "PutCidadesId"
  },
  {
    "type": "delete",
    "url": "/estados/:id",
    "title": "Remover estado",
    "group": "Estados",
    "version": "1.0.0",
    "description": "<p>Remove um estado permanentemente.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do estado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem indicando sucesso.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EstadoNaoEncontrado",
            "description": "<p>O estado informado não existe.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "DeleteEstadosId"
  },
  {
    "type": "get",
    "url": "/estados/",
    "title": "Lista de Estados",
    "group": "Estados",
    "description": "<p>Retorna uma lista de todos os estados brasileiros.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer asd98f09asd8f09a&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "estados",
            "description": "<p>Lista de estados.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Erro - Não Autorizado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\"error\": \"Token não enviado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "GetEstados"
  },
  {
    "type": "get",
    "url": "/estados/cidades",
    "title": "Listar Estados e Cidades",
    "group": "Estados",
    "description": "<p>Retorna uma lista de todos os estados, incluindo suas respectivas cidades.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "estados",
            "description": "<p>Lista de objetos de estado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "estados.nome",
            "description": "<p>Nome do estado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "estados.uf",
            "description": "<p>Sigla do estado (UF).</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "estados.Cidades",
            "description": "<p>Lista de cidades pertencentes ao estado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n[\n{\n\"id\": 1,\n\"nome\": \"São Paulo\",\n\"uf\": \"SP\",\n\"Cidades\": [\n{ \"id\": 101, \"nome\": \"São Caetano do Sul\", \"estadoId\": 1 },\n{ \"id\": 102, \"nome\": \"São Paulo\", \"estadoId\": 1 }\n]\n},\n// ... outros estados ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Falha na conexão ou erro interno do servidor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro 412 Precondition Failed:",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n\"msg\": \"Mensagem de erro\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "GetEstadosCidades"
  },
  {
    "type": "get",
    "url": "/estados/count",
    "title": "Contagem de Estados",
    "group": "Estados",
    "description": "<p>Retorna a quantidade total de estados cadastrados na base de dados.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "qtd_estados",
            "description": "<p>Quantidade total de estados.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\"qtd_estados\": 27\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Falha na conexão ou erro interno do servidor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro 412 Precondition Failed:",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n\"msg\": \"Mensagem de erro\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "GetEstadosCount"
  },
  {
    "type": "get",
    "url": "/estados/:id",
    "title": "Buscar estado por ID",
    "group": "Estados",
    "version": "1.0.0",
    "description": "<p>Retorna um estado específico baseado no ID.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do estado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do estado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome completo do estado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla do estado (UF).</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EstadoNaoEncontrado",
            "description": "<p>O ID informado não existe.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Estado não encontrado:",
          "content": "HTTP/1.1 404 Not Found\n{ \"error\": \"Estado não encontrado\" }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "GetEstadosId"
  },
  {
    "type": "get",
    "url": "/estados/search",
    "title": "Busca Estados por Nome",
    "group": "Estados",
    "description": "<p>Busca estados cujo nome contenha o termo fornecido (LIKE).</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer obtido no endpoint de login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de Uso:",
          "content": "{\n\"Authorization\": \"Bearer SEU_TOKEN_AQUI\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Termo de busca para o nome do estado (Query Parameter).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de Uso:",
          "content": "/estados/search?nome=Minas",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "estados",
            "description": "<p>Lista de objetos de estado que correspondem ao critério de busca.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n{\n\"id\": 1,\n\"nome\": \"Minas Gerais\",\n\"uf\": \"MG\"\n},\n{\n\"id\": 2,\n\"nome\": \"Rio Grande do Norte\",\n\"uf\": \"RN\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 400": [
          {
            "group": "Erro 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>O parâmetro 'nome' é obrigatório ou está vazio.</p>"
          }
        ],
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Outras falhas de validação ou erro interno do servidor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro 400 Bad Request:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Erro 412 Precondition Failed:",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n\"msg\": \"Mensagem de erro\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "GetEstadosSearch"
  },
  {
    "type": "get",
    "url": "/estados/:uf/cidades",
    "title": "Buscar Cidades por UF",
    "group": "Estados",
    "description": "<p>Retorna um estado específico e a lista de suas cidades com base na sigla (UF) fornecida.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla do estado (Ex: SP, MG) passada na URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de Uso:",
          "content": "/estados/RJ/cidades",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "estado",
            "description": "<p>Objeto do estado encontrado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "estado.nome",
            "description": "<p>Nome do estado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "estado.Cidades",
            "description": "<p>Lista de cidades pertencentes ao estado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso 200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\"id\": 2,\n\"nome\": \"Rio de Janeiro\",\n\"uf\": \"RJ\",\n\"Cidades\": [\n{ \"id\": 201, \"nome\": \"Niterói\", \"estadoId\": 2 },\n// ... outras cidades ...\n]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro 404": [
          {
            "group": "Erro 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Estado não encontrado com a UF fornecida.</p>"
          }
        ],
        "Erro 412": [
          {
            "group": "Erro 412",
            "optional": false,
            "field": "PreconditionFailed",
            "description": "<p>Outras falhas de validação ou erro interno.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro 404 Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n\"msg\": \"Estado não encontrado\"\n}",
          "type": "json"
        },
        {
          "title": "Erro 412 Precondition Failed:",
          "content": "HTTP/1.1 412 Precondition Failed\n{\n\"msg\": \"Mensagem de erro\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "GetEstadosUfCidades"
  },
  {
    "type": "post",
    "url": "/estados",
    "title": "Criar um novo estado",
    "group": "Estados",
    "version": "1.0.0",
    "description": "<p>Cria um novo estado no banco de dados.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "nome",
        "description": "<p>Nome do estado.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "uf",
        "description": "<p>Sigla do estado.</p>"
      }
    ],
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID gerado.</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do estado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "HTTP/1.1 201 Created\n{ \"id\": 28, \"nome\": \"Novo Estado\", \"uf\": \"NE\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CamposInvalidos",
            "description": "<p>Campos obrigatórios não enviados.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UFJaExiste",
            "description": "<p>A UF informada já está cadastrada.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "PostEstados"
  },
  {
    "type": "put",
    "url": "/estados/:id",
    "title": "Atualizar estado",
    "group": "Estados",
    "version": "1.0.0",
    "description": "<p>Atualiza os dados de um estado já cadastrado.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer SEU_TOKEN_AQUI&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do estado.</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "nome",
        "description": "<p>Nome do estado.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "uf",
        "description": "<p>Sigla do estado.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de sucesso.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EstadoNaoEncontrado",
            "description": "<p>O estado a ser atualizado não existe.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/estado.js",
    "groupTitle": "Estados",
    "name": "PutEstadosId"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Status da API",
    "group": "Status",
    "name": "GetStatus",
    "version": "1.0.0",
    "description": "<p>Retorna informações básicas sobre o funcionamento da API.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acesso Bearer. Ex: &quot;Bearer asd98f09asd8f09a&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Mensagem indicando que a API está ativa.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Versão atual da API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Estados Brasileiros API\",\n  \"version\": \"1.0.0\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/index.js",
    "groupTitle": "Status"
  }
] });
