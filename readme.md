  [![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=alert_status)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=code_smells)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=ncloc)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=bugs)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=security_rating)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=AmauriOliveira_Agenda-Back-End&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=AmauriOliveira_Agenda-Back-End)

  ![banner](https://i.imgur.com/4YK9Ytt.jpg)

# Calendário de Eventos BackEnd

> Back-end feito em NodeJS para ser API REST de uma SPA

![GitHub last commit](https://img.shields.io/github/last-commit/AmauriOliveira/Agenda-Back-End)
![license](https://img.shields.io/github/license/AmauriOliveira/Agenda-Back-End)
![GitHub repo size](https://img.shields.io/github/repo-size/AmauriOliveira/Agenda-Back-End)

## Documentação dos EndPoints

[Links with title](https://github.com/AmauriOliveira/Agenda-Back-End/blob/main/documentation.md "Documentação")

## :telescope: Overview

  [🏠 Homepage](https://github.com/AmauriOliveira/Agenda-Back-End)
Uma API Rest feita em NodeJS com Typescript, utilizada como back-end de uma Calendário de Eventos, onde uma SPA feita em ReacJS faz o consumo dos Endpoints
## :computer: Techs

- NodeJS
- TypeScript
- JsonWebToken
- Yup
- Typeorm
- express
- bcryptjs

## Instalação
>Execute o comando para baixar e instalar os pacotes

```bath
git clone https://github.com/AmauriOliveira/Agenda-Back-End.git
```

```bath
cd Agenda-Back-End
```

```bath
yarn
```

## Banco de dados

> Foi utilizado uma container Docker

```bath
docker run --name DB-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=amauri32 postgres
```

A Database se chama *desafio*, porem pode ser mudado nas config do *ormconfig.json*


>Execulte as migration

Preciso utilizar para gerar as tabelas do banco de dados

```bath
yarn typeorm migration:run
```

## Executando a API

A port pode ser pelo **process.env.PORT**

Deve criar uma arquivo *.env* com a *SECRET_MD5* assim como no exemplo *.env.example*

>Modo Dev

```bath
yarn dev
```

>Server

```bath
yarn start
```

>Build

```bath
yarn build
```


## :star2: Contributing

Contributions, issues and feature requests are welcome!

- ⭐️ Star the project
- 🐛 Find and report issues
- 📥 Submit PRs to help solve issues or add features

Feel free to check [issues page](https://github.com/AmauriOliveira/Agenda-Back-End/issues). You can also take a look at the contributing guide.

## :bow: Author

**Amauri Antonio de Oliveira &lt;amauriibate32@hotmail.com&gt;**
* Email: amauriibate32@hotmail.com
* GitHub: [@AmauriOliveira](https://github.com/AmauriOliveira)
* LinkedIn: [@amauri-oliveira-058066192](https://linkedin.com/in/amauri-oliveira-058066192)

## :books: License

Copyright © 2020 Amauri Antonio de Oliveira &lt;amauriibate32@hotmail.com&gt;
This project is [MIT](license) licensed.
