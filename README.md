# Express-starter

Express Starter write for fasting my development server

## Dependencies

- Express
- ~~Sequelize~~ TypeORM
- JsonWebToken
- Bcrypt
- Pg
- Multer
- Body-parser
- ~~Sequelize-cli~~
- Morgan
- Joi
- Handlebars
- Typescript

## Dev Dependencies

- Nodemon
- Dotenv

## Install

1. npm install
2. npx sequelize db:migrate (if you have setup the database in sequelize)
3. npm run dev-debug(for development) or npm run start(for production)

## Infrastructure

- routes: handling route
- controller: handling request and response with extracting parameter needed for handler
- handler: handling data needed and spliting parameter for different service
- service: data validation and include modeling and handling business logic
- repository: handling data access and storage related operation

gaya menulis code menggunakan camel case
