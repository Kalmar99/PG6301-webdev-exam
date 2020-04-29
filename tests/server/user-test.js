/*
    File is based on code from lecture 7 but modified to fit my project
    LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/server/app-test.js
*/

const request = require('supertest')
const app = require('../../src/server/app')

const lootDao = require('../../src/server/db/loot')
const pokemonDao = require('../../src/server/db/pokemon')
const userDao = require('../../src/server/db/user')
let id = 0;


test ('Test failed login atempt',async () => {

    const user = {
        username: 'user-'+(id++),
        password: 'password'
    }

    const response = await request(app)
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(401);

})

test('Test 401 on acessing user data without being logged in',async () => {
    
    const response = await request(app).get('/api/user');
    expect(response.statusCode).toBe(401);
})

test('Test register user and fail to get userdata from another session',async () => {
    
    const user = {
        username: 'user-'+(id++),
        password: 'password'
    }
    
    //Get the user agent
    const agent = request.agent(app)

    let response = await agent
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    //Doesent use the agent so this request will not be in the same session
    response = await request(app)
        .get('/api/user')
    
    expect(response.statusCode).toBe(401)
})

test('Test register using and getting data in same session',async () => {

    const username = 'TestUser'+(id++)

    const user = {
        username: username,
        password: 'password'
    }

    const agent = request.agent(app)

    let response = await agent
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    //Make request with same agent
    response = await agent
        .get('/api/user')
    
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(username)
})

test('Test creating user and logging in from another session',async () => {
    
    const username = 'TestUser'+(id++)

    const user = {
        username: username,
        password: 'password'
    }

    const agent = request.agent(app)

    let response = await request(app)
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)

    //Using same user agent as the login
    response = await agent 
        .get('/api/user')

    expect(response.statusCode).toBe(200)
    expect(response.body.username).toBe(username)
})


test('Test opening loot box',async () => {

    pokemonDao.init()
    lootDao.init()

    // Register and login
    const username = 'TestUser'+(id++)

    const user = {
        username: username,
        password: 'password'
    }

    const agent = request.agent(app)

    let response = await request(app)
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)
    
    //Open loot box
    const name = "Pokeball"

    response = await agent
        .post('/api/user/' + user.username + '/lootboxes/' + name)
    
    expect(response.statusCode).toBe(201)

    //Check user lootboxes
    response = await agent
        .get('/api/user/' + user.username + '/lootboxes')
    
    expect(response.statusCode).toBe(200)
    expect(response.body[0].count).toBe(2);

    //Check user pokemon to see if one has been added to collection
    response = await agent 
        .get('/api/user/' + user.username + '/collection')

    expect(response.statusCode).toBe(200)
    expect(response.body.collection).toHaveLength(1)
    expect(response.body.collection[0]).not.toBe(null)

})

test('Test reset user with put',async () => {

    pokemonDao.init()
    lootDao.init()

    // Register and login
    const username = 'TestUser'+(id++)

    const user = {
        username: username,
        password: 'password'
    }

    const agent = request.agent(app)

    let response = await request(app)
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)

    const pokemon = pokemonDao.getPokemon('Pikachu')
    console.log(pokemon)
    userDao.addToCollection(user.username,pokemon)
    userDao.millFromCollection(user.username,pokemon.name)

    response = await agent
        .get('/api/user')
    
    expect(response.statusCode).toBe(200)
    expect(response.body.coins).toBe(5000 + pokemon.millworth)

    response = await agent
        .put('/api/user')

    expect(response.statusCode).toBe(204)
    
    

    response = await agent
        .get('/api/user')
    
    expect(response.statusCode).toBe(200)
    expect(response.body.coins).toBe(5000)

})




