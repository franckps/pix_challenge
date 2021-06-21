# pix_challenge

## Requisitos

### Básico

[✅] O sistema deve ser capaz de estabelecar uma conexão com um banco de dados Postgres.

[✅] O sistema deve ser capaz de lidar com requisições com formato de dados do tipo JSON.

[✅] O sistema deve ser capaz de cadastrar usuários.

[✅] O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.


### Intermediário

[✅] O sistema deve ser capaz de cadastrar chaves de PIX para os usuários já cadastrados.

[✅] Uma chave não poderá ser cadastrada mais de uma vez.

[✅] Cada usuário poderá ter no máximo 3 chaves.

[✅] O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.


###Avançado

[✅]O sistema deve ser capaz de realizar transações PIX.

[✅]Cada transação deve ser identificada de forma única por um id.

[✅]Cada transação deve conter a identificação do usuário que envia e do usuário que recebe o PIX, além do valor, claro.

[✅]O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.


### Bonus

[  ] Adicionar um docker-compose e um Dockerfile.

[  ] Disponibilizar no repositório o arquivo JSON referente às rotas da aplicação.

[✅] Adicionar testes unitários.

[✅] Adicionar tratação de erros de maneira global.


yarn typeorm migration:run

yarn start

Sign Up
Request
{{ _.baseURL }}/signup
{
	"name": "Francisco Pereira",
	"phone": "89 994353697"
}
Response
200
{
  "id": "f7cd4730-af56-4ebe-8751-c523ffcdbf39",
  "name": "Francisco Pereira",
  "phone": "89 994353697"
}

Create Pix Key
Request
{{ _.baseURL }}/user/{{ _.userId }}/pix-key
{
	"key": "89 994353697"
}
Response
200
{
  "id": "28b684ea-7f58-47f7-8669-1597b2a253c7",
  "key": "89 994353697",
  "userId": "f7cd4730-af56-4ebe-8751-c523ffcdbf39"
}

Make A Pix Transaction
Request
{{ _.baseURL }}/user/{{ _.otherUserId }}/pix
{
	"pixKey": "{{ _.pixKey }}",
	"amount": "150"
}
Response
200
{
  "id": "e37bcd6e-cee9-4760-8395-6960689a4d36",
  "amount": 150,
  "creditorId": "f7cd4730-af56-4ebe-8751-c523ffcdbf39",
  "debitorId": "02b12bab-bdfb-4fd8-8bab-a10d25e243a6",
  "createdAt": "2021-06-21T22:42:25.865Z"
}

Get All User
Request
{{ _.baseURL }}/user/
Response
200
[
  {
    "id": "f7cd4730-af56-4ebe-8751-c523ffcdbf39",
    "name": "Francisco Pereira",
    "phone": "89 994353697"
  },
  {
    "id": "02b12bab-bdfb-4fd8-8bab-a10d25e243a6",
    "name": "Francisco Pereira dos Santos",
    "phone": "89 994353696"
  }
]