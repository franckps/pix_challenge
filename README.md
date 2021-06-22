# pix_challenge

Para rodar o sistema basta fazer o clone e rodar o Docker Coompose para subir o servidor
```
git clone https://github.com/franckps/pix_challenge.git
```
```
docker-compose up --build
```
E quando surgir no terminal uma menságem parecida com o texto abaixo, o servidor já estará pronto para receber requisições
```
API is running on 127.0.0.1:3000
```

## JSON para importar no Insomnia ( [Baixar arquivo JSON](https://github.com/franckps/pix_challenge/blob/main/asset/json%20para%20importar%20no%20insomnia%20workspace.json) )


### Caso importe o arquivo Json no insomnia, deve-se alterar as variáveis de ambiente no insomnia para valores válidos
```
{
  "baseURL": "",
  "userId": "",
  "otherUserId": "",
  "pixKey": ""
}
```
### As chaves devem ser preenchidas na ordem do topo para baixo e seguindo o seguinte procedimento:
#### Deve-se colocar na "baseURL" o dominio em que a aplicação está rodando e o subdominio "/api", caso não tenha mudado o host nem a porta o valor será:
```
http://127.0.0.1:3000/api
```
#### O valor de "userId" deve ser preenchido com um id de um usuário cadastrado, ou seja, cadastre um usuário e coloque o "id" deste como valor.

#### O valor de "otherUserId" também deve ser preenchido com um id de um usuário válido más não deve ser igual ao valor de "userId". Cadastre um outro usuário e coloque o "id" deste como valor.

#### O valor de "pixKey" deve ser preenchido com uma chave pix já cadastrada, com isso deve-se cadastrar uma chave pix e preencher o seu valor com ela

## Requests And Responses


### Cadastrar usuário

Request
```
POST: api/signup

{
	"name": "Francisco Pereira",
	"phone": "89 994353697"
}
```
Response
```
200

{
  "id": "f7cd4730-af56-4ebe-8751-c523ffcdbf39",
  "name": "Francisco Pereira",
  "phone": "89 994353697"
}
```
Caso um dos parâmetros("name","phone") não seja passado na requisição a resposta será Um "Invalid param error" com o parâmetro correspondente. Exemplo:
```
400

{
  "error": "Missing param: phone"
}
```



### Criar chave fix

Request
```
POST: api/user/:id/pix-key

{
	"key": "89 994353697"
}
```
Response
```
200

{
  "id": "28b684ea-7f58-47f7-8669-1597b2a253c7",
  "key": "89 994353697",
  "userId": "f7cd4730-af56-4ebe-8751-c523ffcdbf39"
}
```
O parâmetro ":id" deve corresponder a um id de usuário válido, caso o contrário a resposta será:
```
400

{
  "error": "Invalid param: id"
}
```
Caso a "key" já exista ela não será criada novamente e resposta será:
```
400

{
  "error": "Invalid param: key"
}
```
Caso caso a key não seja passada na requisição a resposta será:
```
400

{
  "error": "Missing param: key"
}
```



### Fazendo uma transação pix

Request
```
POST: api/user/:id/pix

{
	"pixKey": "89 994353697",
	"amount": "150"
}
```
Response
```
200

{
  "id": "e37bcd6e-cee9-4760-8395-6960689a4d36",
  "amount": 150,
  "creditorId": "f7cd4730-af56-4ebe-8751-c523ffcdbf39",
  "debitorId": "02b12bab-bdfb-4fd8-8bab-a10d25e243a6",
  "createdAt": "2021-06-21T22:42:25.865Z"
}
```
O parâmetro ":id" deve corresponder a um id de usuário válido, caso o contrário a resposta será:
```
400

{
  "error": "Invalid param: id"
}
```
Caso a "key" não exista resposta será:
```
400

{
  "error": "Invalid param: pixKey"
}
```
Caso um dos parâmetros("pixKey","amount") não seja passado na requisição a resposta será Um "Invalid param error" com o parâmetro correspondente. Exemplo:
```
400

{
  "error": "Missing param: pixKey"
}
```

A chave pix passada na requisição não deve ser uma das chaves do próprio usuário que faz a transação, caso seja uma de suas chaves a resposta da requisição será:
```
400

{
  "error": "Operation not permitted"
}
```



### Listando todos os usuários cadastrados
```
Request
GET: api/user/
```
Response
```
200

[
  {
    "id": "f7cd4730-af56-4ebe-8751-c523ffcdbf39",
    "name": "Francisco Pereira",
    "phone": "89 994353697"
  }
]
```



### Listando todas as chaves pix de um usuário

Request
```
GET: api/user/:id/pix-key
```
Response
```
200

[
  {
    "id": "f3998a09-384a-442a-bce5-8478e7d20de6",
    "key": "89 994353697",
    "userId": "021a27d1-1a5f-440d-9dd9-89a29cd971b3"
  }
]
```
O parâmetro ":id" deve corresponder a um id de usuário válido, caso o contrário a resposta será:
```
400

{
  "error": "Invalid param: id"
}
```



### Listando todas as chaves pix cadastradas

Request
```
GET: api/user/:id/pix-key
```
Response
```
200

[
  {
    "id": "f3998a09-384a-442a-bce5-8478e7d20de6",
    "key": "89 994353697",
    "userId": "021a27d1-1a5f-440d-9dd9-89a29cd971b3"
  }
]
```
O parâmetro ":id" deve corresponder a um id de usuário válido, caso o contrário a resposta será:
```
400

{
  "error": "Invalid param: id"
}
```



### Listando todas as transações vinculadas a um usuário

Request
```
GET: api/user/:id/transaction
```
Response
```
200

[
  {
    "id": "0515fb90-ae6d-492f-a925-3c953ec058da",
    "amount": 150,
    "creditorId": "021a27d1-1a5f-440d-9dd9-89a29cd971b3",
    "debitorId": "8f233c59-02c3-4b99-afb4-12d69093c2f4",
    "createdAt": "2021-06-22T01:02:14.352Z"
  }
]
```
O parâmetro ":id" deve corresponder a um id de usuário válido, caso o contrário a resposta será:
```
400

{
  "error": "Invalid param: id"
}
```



### Listando todas as transações

Request
```
GET: api/transaction
```
Response
```
200

[
  {
    "id": "0515fb90-ae6d-492f-a925-3c953ec058da",
    "amount": 150,
    "creditorId": "021a27d1-1a5f-440d-9dd9-89a29cd971b3",
    "debitorId": "8f233c59-02c3-4b99-afb4-12d69093c2f4",
    "createdAt": "2021-06-22T01:02:14.352Z"
  }
]
```

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

[✅] Adicionar um docker-compose e um Dockerfile.

[✅] Disponibilizar no repositório o arquivo JSON referente às rotas da aplicação.

[✅] Adicionar testes unitários.

[✅] Adicionar tratação de erros de maneira global.
