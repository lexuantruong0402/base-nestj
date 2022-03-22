# NestJS codebase (TypeOrm, mySQL, Swagger, Authentication, Authorization)

REST API with NestJS and MySQL, Using TypeOrm to connect.
This project has the base code for the functions

- Authentication - using jwt.
- Authorization - use casl to decentralize users.
- Transform Interceptor - format response.
  This base project also contains basic instructions on using and programming additional functions.

## Authors

- [@truonglx](lexuantruong0402@gmail.com)

## Name Convention

- Database and Variable: camelCase
- Filename: aaa-bbb.type.ts

## TypeOrm

Using Migrations - typeorm to create, edit database.
Please check file:

```
- src/database/ormconfig-migration.ts
- ormconfig.ts
- .env
```

- ormconfig: is config for connect between NestJs and database.
- ormconfig-migration: is config for migration.
- env: config file for the environment.

## Authentication

Need `SECRETKEY` and `EXPIRESIN` - please check `src/module/authentication/auth.module.ts`

All API need token to call. If you want a PUBLIC API, please add:

This is controller file:

```
@Public()
@Get()
findAll() {
  return [];
}
```

The `payload` interface will contain the information you want to put in the token.

## Authorization

Using CASL.
Can configure actions for each role in the file:

`src/module/casl/casl-ability.factory.ts`

How to use:
Please check `user.service.ts`

## Installation and Run

- Create database (option)

```bash
  docker-compose up
```

- Install

```bash
  npm install
```

- Please install Eslint and Prettier extension if you are using vscode

- Run

```bash
  npm run start:dev
```

## NPM scripts

- Lint check and fix

```bash
  npm run lint
```

- TypeOrm create empty migration file

```bash
  npm run typeorm:create
```

- TypeOrm migration run

```bash
  npm run typeorm:up
```

- TypeOrm migration revert

```bash
  npm run typeorm:down
```

- Generate resource nestJs(dto, entity, controller, module, service). Not include `repository` file

```bash
  nest g resource module/module-name --no-spec
```

## Acknowledgements

- [TypeOrm Migrations](https://orkhan.gitbook.io/typeorm/docs/migrations)
- [NestJs Authentication](https://docs.nestjs.com/security/authentication)
- [NestJs Authorization Casl](https://docs.nestjs.com/security/authorization)

## Swagger API docs

This example repo uses the NestJS swagger module for API documentation. NestJS Swagger - (www.swagger.io)

## Logger

check `src/logger.middleware.ts` to write more. Turn on logger `src/main.ts`
