# Guardianvets-Test

Please follow these steps to run the server locally

1. Clone the repository.
2. Create a file named `development.env` in the project's root folder.
3. Copy the contents of `.env.example` file and paste them in `development.env`.
4. Then assign values to those variables according to your needs.
5. Then run `npm install`.

## Cli

To run cli use the following command

```bash
node ./src/cli -h
```

## Postman Collection

The postman collection is attached in this repo named `Postman_Collection.json`

## Testing with postman

### Register api

1. Make a POST request to `http://localhost:9000/api/user/registe`.
2. Set the Authorization to use `Bearer Token` and set the token value to the `MASTER_KEY` defined in the `development.env` file.
3. Set the Body to use raw and select JSON and use the following JSON format.

```bash
{
  "email": "ahmad@gmail.com",
  "password": "12345678"
}
```

### Login api

1. Make a POST request to `http://localhost:9000/api/user/sign-in`.
2. Set the Authorization to use `Basic Auth` and enter the email and password in the fields.
3. Set the Body to use raw and select JSON and use the following JSON format.

```bash
{
  "access_token": "MASTER_KEY"
}
```

where `MASTER_KEY` is defined in the development.env file.

### Logout api

1. Make a GET request to `http://localhost:9000/api/user/sign-out`.
2. Set the Authorization to use `Bearer Token` and set the token value to the token returned by the Login api in response.

## Commands

After you generate your project, these commands are available in `package.json`.

```bash
npm run lint # lint using ESLint
npm run dev # run the API in development mode
npm run prod # run the API in production mode
```

## Playing locally

1. First, you will need to install and run PostgreSQL.
2. Then, create a databse named whatever you want (keep in mind the db's name must be provided in the development.env file).
3. Then run the following command to apply migrations

```bash
$ npx knex migrate:latest --knexfile src/services/knex/knexConfig.js
```

4. Then run the development server.

```bash
$ npm run dev
Express server listening on http://0.0.0.0:9000, in development mode
```

## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ helpers.js
│  │  ├─ index.js
│  │  └─ queries.js
│  └─ index.js
├─ cli/
│  ├─ actions.js
│  └─ index.js
├─ services/
│  ├─ bcrypt/
│  ├─ express/
│  ├─ jwt/
│  ├─ knex/
│  └─ passport/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/user/queries.js

All the queries used in the api/user/controller.js exists in this file

#### src/api/user/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/user/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.
