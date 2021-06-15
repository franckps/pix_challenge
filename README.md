# pix_challenge

##Requisitos
###Básico
[  ]O sistema deve ser capaz de estabelecar uma conexão com um banco de dados Postgres.
[  ]O sistema deve ser capaz de lidar com requisições com formato de dados do tipo JSON.
[  ]O sistema deve ser capaz de cadastrar usuários.
[  ]O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.

###Intermediário
[  ]O sistema deve ser capaz de cadastrar chaves de PIX para os usuários já cadastrados.
[  ]Uma chave não poderá ser cadastrada mais de uma vez.
[  ]Cada usuário poderá ter no máximo 3 chaves.
[  ]O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.

###Avançado
[  ]O sistema deve ser capaz de realizar transações PIX.
[  ]Cada transação deve ser identificada de forma única por um id.
[  ]Cada transação deve conter a identificação do usuário que envia e do usuário que recebe o PIX, além do valor, claro.
[  ]O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.

###Bonus
[  ]Adicionar um docker-compose e um Dockerfile.
[  ]Disponibilizar no repositório o arquivo JSON referente às rotas da aplicação.
[  ]Adicionar testes unitários.
[  ]Adicionar tratação de erros de maneira global.

