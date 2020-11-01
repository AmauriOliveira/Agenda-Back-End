# Documentação da API

Esta API é utilizada para criar usuários e datas de eventos.
> Utiliza um banco de dado relacional, sendo ele em postgres
API utiliza somente **application/json; charset=utf-8**

## EndPoints

### GET /events

Esse endpoint é responsável por retornar uma lista com todos os eventos cadastrados no banco de dados pelo usuário que fez login, os eventos são ordenados pela data de início em ordem crescente.

#### Parâmetros

Deve vir o token de autenticação na header da requisição

```JSON
 headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }
```

#### Respostas

##### 200 OK!

Caso essa resposta aconteça você vai receber uma listagem de todos os eventos

**Exemplo de resposta:**

```JSON
[
  {
    "id": "96355e2b-6c2f-48c0-82b5-921311304342",
    "name": "Foca na lição",
    "description": "foco em ação",
    "fromDate": "2019-09-28T16:00:49.825Z",
    "toDate": "2019-09-28T18:17:00.825Z",
    "userId": "93589172-dba8-4f8a-b615-7ea7140584a0"
  },
 ]
```

>Todos são obrigatórios
 **id** do evento é uma string UUID que foi gerado com autoincremento, é uma string.
 **name** do evento, é uma string.
 **description**: do evento, é uma string.
 **fromDate**: Data e hora de início do evento no padrão ISO 8601, é uma string.
 **toDate**: Data e hora de fim do evento no padrão ISO 8601, é uma string.
 **userId**: UUID do usuário que fez o post, é uma string

##### Exemplo da ISO 8601

  YYYY = 4 dígitos Ano
  MM   = 2 dígitos Mês (01 = janeiro etc.)
  DD   = 2 dígitos dias do Mês (01 a 31)
  hh   = 2 dígitos das horas (00 a 23)
  mm   = 2 dígitos dos minutos (00 a 59)
  ss   = 2 dígitos dos segundos (00 a 59)
  s    = 1 ou mais dígitos representando a fração decimal de um segundo
  TZD = Designador de fuso horário (Z ou + hh: mm ou -hh: mm)

##### 401 Unauthorized

Caso essa resposta aconteça você não enviou o JWT no header e vai vir uma aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "JWT token is missing"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você enviou o JWT no header com erro e vai vir uma aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Invalid JWT token"
}
```

### GET /events/ID

Esse endpoint é responsável por retornar um único evento cadastrado no banco de dados.
>Só retorna se o evento for do usuário logado.

#### Parâmetros

**Id:** Uma string UUID que representa o id do evento a ser buscado no sistema

Deve vir o token de autenticação no header da requisição

```JSON
 headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }
```

#### Respostas

##### 200 OK!

Caso essa resposta aconteça você vai receber um post

**Exemplo de resposta:**

```JSON
{
  "id": "d88cefc0-5f05-4d44-a5e7-cc5e1b955aba",
  "name": "Só hoje",
  "description": "só mesmo",
  "fromDate": "2020-10-31T14:00:00.825Z",
  "toDate": "2020-10-31T23:17:00.825Z",
  "userId": "93589172-dba8-4f8a-b615-7ea7140584a0"
}
```
> Tem exemplos da ISO 8601 acima

>Todos são obrigatórios
 **id** do evento é uma string UUID que foi gerado com autoincremento, é uma string.
 **name** do evento, é uma string.
 **description**: do evento, é uma string.
 **fromDate**: Data e hora de início do evento no padrão ISO 8601, é uma string.
 **toDate**: Data e hora de fim do evento no padrão ISO 8601, é uma string.
 **userId**: UUID do usuário que fez o post, é uma string


##### 404 Not Found

Caso essa resposta aconteça você está enviando um id errado ou inexistente

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Event can not found"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você não enviou o JWT no header e vai vir um aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "JWT token is missing"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você enviou o JWT no header com erro e vai vir um aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Invalid JWT token"
}
```

### POST events/

Esse endpoint é responsável por cadastrar um novo evento no banco de dados.

#### Parâmetros

> O UUID do usuário é extraído do token

```JSON
 headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }
```

##### Exemplo do BODY

> Todo são obrigatórios

	**name:** string, nome do evento
	**description:** string, descrição do evento
	**fromDate:** string, representação da data de início do evento em ISO 8601
	**toDate:** string, representação da data do fim do evento em ISO 8601

  > Tem exemplos da ISO 8601 acima

> Deve enviar um JSON no body da requisição

```JSON
{
	"name": "Só hoje",
	"description": "só mesmo",
	"fromDate": "2020-10-31T14:00:00.825Z",
	"toDate": "2020-10-31T23:17:00.825Z"
}
```

#### Respostas

#####  201 CREATED

Caso essa resposta aconteça você cadastrou um novo evento com sucesso

**Exemplo de resposta:**

```JSON
{
  "name": "Só hoje",
  "description": "só mesmo",
  "fromDate": "2020-10-31T14:00:00.825Z",
  "toDate": "2020-10-31T23:17:00.825Z",
  "userId": "93589172-dba8-4f8a-b615-7ea7140584a0",
  "id": "d88cefc0-5f05-4d44-a5e7-cc5e1b955aba"
}
```

> **id** do evento é uma string UUID que foi gerado com autoincremento, é uma string.
  **name** do evento, é uma string.
  **description**: do evento, é uma string.
  **fromDate**: Data e hora de início do evento no padrão ISO 8601, é uma string.
  **toDate**: Data e hora de fim do evento no padrão ISO 8601, é uma string.
  **userId**: UUID do usuário que fez o post, é uma string

##### 400 Bad Request

Caso essa resposta aconteça o as datas estão invertidas ou com erro.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Has an error on one of the dates"
}
```

##### 400 Bad Request

Caso essa resposta aconteça o horário já tem evento marcado.

**Exemplo de resposta:**

```JSON
  {
  "status": "error",
  "massege": "This event is already booked"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você não enviou o JWT no header e vai vir uma aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "JWT token is missing"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você enviou o JWT no header com erro e vai vir uma aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Invalid JWT token"
}
```

##### 500 Internal Server Error

Caso essa resposta aconteça você não enviou corretamente os parâmetros

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Internal server error"
}
```

### PUT events/ID

Esse endpoint é responsável por alterar um evento no banco de dados.

#### Parâmetros

> O UUID do usuário é extraído do token

**Id:** Uma string UUID que representa o id do evento a ser alterado

```JSON
 headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }
```

##### Exemplo do BODY

> Todo são obrigatórios

	**name:** string, nome do evento
	**description:** string, descrição do evento
	**fromDate:** string, representação da data de início do evento em ISO 8601
	**toDate:** string, representação da data do fim do evento em ISO 8601

  > Tem exemplos da ISO 8601 acima

> Deve enviar um JSON no body da requisição

```JSON
{
  "name": "Feira livre",
  "description": "Será que somos livres",
  "fromDate": "2020-11-11T16:00:49.825Z",
  "toDate": "2020-11-12T18:17:00.825Z"
}
```

#### Respostas

##### 200 OK

Caso essa resposta aconteça você alterou o evento com sucesso

**Exemplo de resposta:**

```JSON
{
  "name": "Só hoje",
  "description": "só mesmo",
  "fromDate": "2020-10-31T14:00:00.825Z",
  "toDate": "2020-10-31T23:17:00.825Z",
  "userId": "93589172-dba8-4f8a-b615-7ea7140584a0",
  "id": "d88cefc0-5f05-4d44-a5e7-cc5e1b955aba"
}
```

> **id** do evento é uma string UUID que foi gerado com autoincremento, é uma string.
  **name** do evento, é uma string.
  **description**: do evento, é uma string.
  **fromDate**: Data e hora de início do evento no padrão ISO 8601, é uma string.
  **toDate**: Data e hora de fim do evento no padrão ISO 8601, é uma string.
  **userId**: UUID do usuário que fez o post, é uma string

##### 400 Bad Request

Caso essa resposta aconteça o as datas estão invertidas ou com erro.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Has an error on one of the dates"
}
```

##### 400 Bad Request

Caso essa resposta aconteça o horário já tem algo marcado.

**Exemplo de resposta:**

```JSON
  {
  "status": "error",
  "massege": "This event is already booked"
}
```

##### 400 Bad Request

Caso essa resposta aconteça você enviou um ID errado.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "This Event does not exist"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você não enviou o JWT no header e vai vir um aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "JWT token is missing"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você enviou o JWT no header com erro e vai vir um aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Invalid JWT token"
}
```

##### 500 Internal Server Error

Caso essa resposta aconteça você não enviou corretamente os parâmetros

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Internal server error"
}
```

### DELETE events/ID

Esse endpoint é responsável por apagar um evento no banco de dados.

#### Parâmetros


**Id:** Uma string UUID que representa o id do evento a ser deletado

```JSON
 headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }
```

#### Respostas

##### 200 OK

Caso essa resposta aconteça você apagou o evento com sucesso

**Exemplo de resposta:**

```JSON
{
  "raw": [],
  "affected": 1
}
```

> **affected** número de evento que foram removidos, é um Inteiro.


##### 400 Bad Request

Caso essa resposta aconteça o evento não existe ou ID está incorreto.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "This EventId does not exist"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você não enviou o JWT no header e vai vir uma aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "JWT token is missing"
}
```

##### 401 Unauthorized

Caso essa resposta aconteça você enviou o JWT no header com erro e vai vir uma aviso.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Invalid JWT token"
}
```

##### 500 Internal Server Error

Caso essa resposta aconteça você não enviou corretamente os parâmetros

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Internal server error"
}
```

### POST users/

Esse endpoint é responsável por cadastrar um novo usuário no banco de dados.

#### Parâmetros

> Não tem

##### Exemplo do BODY

> Todo são obrigatórios

	**name:** string, nome do usuario
	**email:** string, e-mail do usuario, usado no login
	**password:** string, senha do ussuario, usado no login

> Deve enviar um JSON no body da requisição

```JSON
{
	"name": "Amauri Oliveira",
	"email": "amauriibate32@hotmail.com",
	"password": "15111986"
}
```

#### Respostas

##### 201 CREATED

Caso essa resposta aconteça você cadastrou um novo evento com sucesso

**Exemplo de resposta:**

```JSON
{
  "name": "Amauri Oliveira",
  "email": "amauriibate32@hotmail.com",
  "id": "93589172-dba8-4f8a-b615-7ea7140584a0"
}
```

> **id** do usuário é um UUID que foi gerado com autoincremento, é uma string.
  **name** do usuário, é uma string.
  **email**: do usuário, é uma string.

##### 400 Bad Request

Caso essa resposta aconteça o e-mail já foi registrado.

**Exemplo de resposta:**

```JSON
{
  "error": "Email address already used"
}
```

##### 500 Internal Server Error

Caso essa resposta aconteça você não enviou corretamente os parâmetros

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Internal server error"
}
```

### POST sessions/

Esse endpoint é responsável por fazer o login usuário.

#### Parâmetros

> Não tem

##### Exemplo do BODY

> Todo são obrigatórios

	**email:** string, e-mail do usuário, usado no login
	**password:** string, senha do usuário, usado no login

> Deve enviar um JSON no body da requisição

```JSON
{
	"email": "amauriibate32@hotmail.com",
	"password": "15111986"
}
```

#### Respostas

##### 200 OK

Caso essa resposta aconteça o usuário fez login com sucesso

**Exemplo de resposta:**

```JSON
{
  "user": {
    "id": "93589172-dba8-4f8a-b615-7ea7140584a0",
    "name": "Amauri Oliveira",
    "email": "amauriibate32@hotmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQxOTMyNDUsImV4cCI6MTYwNDI3OTY0NSwic3ViIjoiOTM1ODkxNzItZGJhOC00ZjhhLWI2MTUtN2VhNzE0MDU4NGEwIn0.6KeTpd6oqsYdfSxYqYBwMjqGtyVSrQMDuSdfhBj3gMU"
}
```

> **id** do usuário é um UUID que foi gerado com autoincremento, é uma string.
  **name** do usuário, é uma string.
  **email**: do usuário, é uma string.
  **token**: uma JWT que deve ser usado nas requisições, é uma string

##### 401 Unauthorized

Caso essa resposta aconteça o login ou a senha estão incorretas.

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Incorrect email/password combination"
}
```

##### 500 Internal Server Error

Caso essa resposta aconteça você não enviou corretamente os parâmetros

**Exemplo de resposta:**

```JSON
{
  "status": "error",
  "massege": "Internal server error"
}
```
