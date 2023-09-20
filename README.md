## Galaxy Padel | Backend

This folder contains the Backend of a FullStack application called Galaxy Padel.

It consists of a part that collects data from a server hosted with the MongoDB service in order to serve this data to the Frontend part of the application.

The MERN Stack is MongoDB, React, Express and Node.js.

:yellow_circle: :large_blue_circle: :yellow_circle: :large_blue_circle: :yellow_circle: :large_blue_circle:

The stack used in this project consists of **Typescript** as the main language.

Eslint as linting open source code and Prettier to structure the code correctly. **Firebase** to authenticate users and Cors to allow connections between the application and third-party websites where we host our server, which in this case is Render.

Husky and git-hub actions to manage file uploads to the git environment.

Also **mongo-memory-server** to connect to MongoDB and mongoose server. Everything at 100% coverage with the Jest and Supertest testing libraries to test the endpoints. Msw to create Mocks for testing.

## Server deployment:

https://jose-vera-final-project-202307-bcn.onrender.com/

## Testing coverage:

![sonarcloudbackend](https://cdn.discordapp.com/attachments/1150483066259775582/1154134086949011607/sonarcloudbackend.png)

## Scripts

:desktop_computer:Set up server locally and build

`npm start: "node ."`

`npm run build: "tsc"`

`npm build:dev: "tsc -w"`

:mag:Test

`npm run test: "jest"`

`npm run test:dev: "jest --watchAll"`

## Endpoints

[GET]/rackets

codeStatus: `200`
errorMessage: `404`, `Can't retrieve rackets`

[POST]/create

codeStatus: `201`
errorMessage: `500`, `Could not create the racket`

[DELETE]/rackets/:racketsId

codeStatus: `200`

errorMessage: `500` , `Could not delete racket`

[MODIFY]/rackets/:racketsId

codeStatus: `204`

errorMessage: `500` , `Can't modify the racket`

[GET]/rackets/:racketsId

codeStatus: `204`

errorMessage: `500` , `Can't retrieve the racket`

## Functionality

:small_orange_diamond: The main objective is to be able to collect information from the database through a GET method

:small_blue_diamond: Once we have this information, we can delete the rackets we want from the database through a DELETE method.

:small_orange_diamond: In addition, we can also modify a property (favorite) with the PATCH method.

:small_blue_diamond:Finally we can also create new padel rackets with the POST method.

:white_check_mark: All these methods have been tested with the POSTMAN application.
