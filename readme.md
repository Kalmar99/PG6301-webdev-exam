### PG6301 Exam
My exam for the course PG6301 Web development and Api Design on Høyskolen kristiania.
Its a pokemon gotcha game made with react and express. Server provides an RESTful api and serves the front-end.
The front-end is a single page application made with react. The game is simple. you get 3 lootboxes (pokeballs) when you create an account, aswell as 5000 coins.
You can then buy lootboxes and get different kinds of pokemon based of what lootbox you open. You can also mill (sell) the pokemons you have aquired and earn more money to buy more lootboxes. There is 3 different lootboxes (pokeballs) to choose from and 9 different pokemons you can collect.

### Technologies used
- React for the front end
- Bootstrap for positioning (with react-bootstrap)
- Express for the web server
- Babel with webpack to compile the frontend
- Jest with Jsdom, Enzyme and Supertest to test both front-end and backend
- Passport for authentication

#### Usage
`yarn install` - Install dependencies\
`yarn dev` - Starts both server and compiles front-end and watches for changes\
`yarn start` - starts the server\
`yarn test` - runs all jest tests\
`yarn watch:client` - compiles the front-end and watches for changes\
`yarn watch:server` - starts the server and watches for changes\
`yarn build` - builds the front-end\

### Structure
Its 3 main folders: src, public and tests.
source code for the app is in src, static files in public and tests in test\
**folder tree:**
 - public
    - static files like index.html etc
 - src
    - client
       - jsx files for react front-end
    - server
       - db
          - 'Fake' database code. Stores data in memory and retrieves data.
       - routes
          - All the api endpoints
       - app.js
       - server.js
 - tests
     - client
        - tests for the front-end
     - server
        - tests for the backend
     - jest-setup.js
     - my-test-utils.js

### Features
##### R requirements
- [X] Completed R1
- [X] Completed R2 
- [X] Completed R3
- [X] Completed R4
- [X] R5 Partly'ish compleded (See extra features)
##### T requirements
- [X] Completed T1
- [X] Completed T2
- [X] Completed T3
- [X] Completed T4
- [X] Completed T5
- [ ] **Not** Completed T6

##### Extra features
- 3 Different Loot boxes with different loot tables 

### Test coverage
% Stmts: 61.78\
% Funcs: 66\
% Lines: 61.53


### Notes
There is already a user account created when the server starts username: `Foo` and password: `bar` but you can also create a user from the front-end.

At user-routes.js Line: 153 there is a delete endpoint. I am not sure if that should be a delete. If the user has only 1 pokemon of x type in their collection it will delete it. However if the user has more than 1 pokemon of x type in their collection, the count on that object would just be subtracted. I chose to go with delete as you are essentialy deleting one of the x type in your collection. If thats wrong, at least know that i thought about it.

I only have one PUT and its in user-routes.js and is used to reset an account back its original state.

Some of the code in the tests folder are either copied or based of the code from the course git repo. In every file that has copied code or code that is based of the code from the lectures, there is a note at the top spesifying where it was copied from and to what extent.

Images are downloaded from: https://www.pokemon.com/no/pokedex/
And: https://bulbapedia.bulbagarden.net/wiki/File:Pok%C3%A9_Balls_GL.png


#### Known Bugs/imperfections
 - When milling a pokemon you need to refresh the page to see the updated coins in the header bar.