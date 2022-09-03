# egfwd-StoreFront-Backend
## Description
Create an API for E-Commerce Store Front Backend that should handle all CRUD Operations for Users, Products, and Orders using Node.js, TypeScript, Express,PostgreSQL , JWT for Authentication, Bcrypt for Password Hashing, and Jasmine for Unit Testing.
this project is submitted for Advanced Full-Stack Web Development Nanodegree by udacity.

# Project Structure
``` python
└───src
    │   index.ts
    │
    ├───controllers
    │       order.controller.ts
    │       product.controller.ts
    │       user.controller.ts
    │
    ├───database
    │       database.ts
    │
    ├───middlewares
    │       authorization.middleware.ts
    │       error.middleware.ts
    │
    ├───models
    │   ├───database
    │   │       order.model.ts
    │   │       product.model.ts
    │   │       user.model.ts
    │   │
    │   └───error
    │           error.model.ts
    │
    ├───routes
    │   │   index.ts
    │   │
    │   └───api
    │           order.route.ts
    │           product.route.ts
    │           user.route.ts
    │
    ├───tests
    │   │   index.spec.ts
    │   │
    │   ├───helpers
    │   │       reporter.ts
    │   │
    │   ├───models
    │   │   └───database
    │   │           order.model.spec.ts
    │   │           product.model.spec.ts
    │   │           user.model.spec.ts
    │   │
    │   └───routes
    │       │   index.spec.ts
    │       │
    │       └───api
    │               order.route.spec.ts
    │               product.route.spec.ts
    │               user.route.spec.ts
    │
    ├───types
    │       order-product.d.ts
    │       order.d.ts
    │       product.d.ts
    │       user.d.ts
    │
    └───utils
            hashing.ts
```


## Database Setup

```sql
psql -U postgres 
-- then, enter your password for postgres user
create USER storeuser with PASSWORD '12345678';
create database store;
create database storetest;
grant all privileges on database store to storeuser;
grant all privileges on database storetest to storeuser;
```
## Ports used for backend server and database are listed in .env file
```bash
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=storeuser
POSTGRES_PASSWORD=12345678
POSTGRES_PORT=5432
POSTGRES_DB_TEST=storetest
BCRYPT_PASSWORD=cloud-password
SALT_ROUNDS=10
JWT_SECRET=jwt-password
```

## Package Installation and How to Run the Project
1. make a file named .env and copy the content of env_example.txt to it
```bash
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=storeuser
POSTGRES_PASSWORD=12345678
POSTGRES_PORT=5432
POSTGRES_DB_TEST=storetest
BCRYPT_PASSWORD=cloud-password
SALT_ROUNDS=10
JWT_SECRET=jwt-password
```

2. Install required packages
```bash
npm install
```
3. run database migration
```bash
db-migrate reset
db-migrate up
```
to build the application and compile TS to JS 
```bash
npm run build
 ```
 to start the server in production/build
 ```bash
npm run start
 ```
 to start the server in dev
 ```bash
npm run start-dev
 ```
to run tests    
  ```bash
npm run test
 ```

to run lint and prettier    
  ```bash
npm run lint
npm run prettier
 ```
## Thunder Client Collection
you can import the collection from the file `thunder-collection_Storefront API.json` to thunder client in VSCODE to test the API

## resources used
1. https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-t for error handling
2. https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/ for CRUD operations


## Technologies and Tools Used
1. Node.js
2. TypeScript 
3. Express
4. PostgreSQL
5. JWT for Authentication
6. Bcrypt for Password Hashing
7. Jasmine for Unit Testing
8. db-migrate for database migration
9. ESLint for linting
10. Prettier for code formatting
11. Thunder Client for API testing
