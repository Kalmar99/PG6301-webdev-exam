### PG6301 Exam
My exam for the course PG6301 Web development and Api Design on Høyskolen kristiania.
Its a pokemon gotcha game made with react and express. Server provides an RESTful api and serves the front-end.
The front-end is a single page application made with react. The game is simple. you get 3 lootboxes (pokeballs) when you create an account, aswell as 5000 coins.
You can then buy lootboxes and get different kinds of pokemon based of what lootbox you open. You can also mill (sell) the pokemons you have aquired and earn more money to buy more lootboxes. There is 3 different lootboxes (pokeballs) to choose from and 9 different pokemons you can collect.


#### Usage
`yarn install` - Install dependencies\
`yarn dev` - Starts both server and compiles front-end and watches for changes\
`yarn start` - starts the server\
`yarn test` - runs all jest tests\
`yarn watch:client` - compiles the front-end and watches for changes\
`yarn watch:server` - starts the server and watches for changes\
`yarn build` - builds the front-end\

### Features
##### R requirements
- [X] Completed R1
- [X] Completed R2 (Put is never used by front-end but its there)
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

#### Test coverage
% Stmts: 
% Funcs:
% Lines: 


### Notes
There is already a user account created when the server starts username: `Foo` and password: `bar` but you can also create a user from the front-end
At user-routes.js Line: 153 there is a delete endpoint. I am not sure if that should be a delete. If the user has only 1 pokemon of x type in their collection it will delete it. However if the user has more than 1 pokemon of x type in their collection, the count on that object would just be subtracted. I chose to go with delete as you are essentialy deleting one of the x type in your collection. If thats wrong, at least know that i thought about it.

Some of the code in the tests folder are either copied or based of the code from the course git repo. In every that has copied code there is a note at the top spesifying where it was copied from and to what extent.

