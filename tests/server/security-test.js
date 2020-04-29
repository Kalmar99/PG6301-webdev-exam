const request = require('supertest')
const app = require('../../src/server/app')
const loot = require('../../src/server/db/loot')
const pokemon = require('../../src/server/db/pokemon')
const userDao = require('../../src/server/db/user')
/*  loot-routes  */
test('Test buy lootbox when not logged in',async () => {

    loot.init()

    const response = await request(app)
        .post('/api/lootboxes/Pokeball')

    expect(response.statusCode).toBe(401)
    
})

test ('Test buy lootbox while not being logged in',async () => {
    loot.init()

    const response = await request(app)
        .post('/api/lootboxes/Pokeball')
    
    expect(response.statusCode).toBe(401)

})

/*   user-routes    */

test('Test get user data while not logged in',async () => {
    
    const response = await request(app)
        .get('/api/user')

    expect(response.statusCode).toBe(401)
})

test('Test update user while not logged in',async () => {
    
    const response = await request(app)
        .put('/api/user')
        .send({username: 'Foo',password: 'Bar'})
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(401)
})

test('Test get user collection without being logged in',async () => {

    const response = await request(app)
        .get('/api/user/Foo/collection')
    
    expect(response.statusCode).toBe(401)

})

test('Test get another users collection while being logged in',async () => {
    
    const agent = request.agent(app)
    
    const otherUser = {
        username: 'dontstealmydata',
        password: '404'
    }
    
    
    const user = {
        username: 'FooSecurity',
        password: 'BarPassword'
    }


    //Create user
    let response = await agent
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    //Create target user
    response = await request(app)
        .post('/api/signup')
        .send(otherUser)
        .set('Content-Type','application/json')
    //1
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
    //2
    expect(response.statusCode).toBe(204)


    response = await agent
        .get('/api/user/' + otherUser.username + '/collection')
    
    expect(response.statusCode).toBe(401)
})

test('Get a users lootboxes without being logged in',async () => {

    const response = await request(app)
        .get('/api/user/Foo/lootboxes')

    expect(response.statusCode).toBe(401)

})

test('Get antoher users lootboxes while being logged in',async () => {
    
    const agent = request.agent(app)
    
    const otherUser = {
        username: 'dontstealmydata2',
        password: '404'
    }
    
    
    const user = {
        username: 'FooSecurity2',
        password: 'BarPassword'
    }


    //Create user
    let response = await agent
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    //Create target user
    response = await request(app)
        .post('/api/signup')
        .send(otherUser)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
   
    expect(response.statusCode).toBe(204)


    response = await agent 
        .get('/api/user/'+otherUser.username+'/lootboxes')
    
    expect(response.statusCode).toBe(401)

})

test('Test Buy lootbox without being logged in',async () => {
    
    loot.init()
    pokemon.init()

    const response = await request(app)
        .post('/api/user/Foo/lootboxes/Pokeball')
    
    expect(response.statusCode).toBe(401)
})

test('Test open a lootbox that belongs to another user',async () => {

    pokemon.init()
    loot.init()

    const agent = request.agent(app)
    
    const otherUser = {
        username: 'dontstealmydata3',
        password: '404'
    }
    
    
    const user = {
        username: 'FooSecurity3',
        password: 'BarPassword'
    }


    //Create user
    let response = await agent
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    //Create target user
    response = await request(app)
        .post('/api/signup')
        .send(otherUser)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
   
    expect(response.statusCode).toBe(204)

    response = await agent 
        .post('/api/user/' + otherUser.username + '/lootboxes/Pokeball')
    
    
    expect(response.statusCode).toBe(403)
})


test('Test Delete(Mill) other users pokemon without being logged in',async () => {

    const response = await request(app)
        .delete('/api/user/Foo/collection/Pikachu')
    
    expect(response.statusCode).toBe(401)

})

test('Test delete/mill other users pokemon while being logged in',async () => {

    pokemon.init()
    loot.init()

    const agent = request.agent(app)
    
    const otherUser = {
        username: 'dontmillmydata',
        password: '404'
    }
    
    
    const user = {
        username: 'FooSecurity404',
        password: 'BarPassword'
    }

    //Create user
    let response = await agent
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(201)

    //Create target user
    response = await request(app)
        .post('/api/signup')
        .send(otherUser)
        .set('Content-Type','application/json')

    const pokemonO = pokemon.getPokemon('Pikachu')
    userDao.addToCollection(otherUser.username,pokemonO)
    
    expect(response.statusCode).toBe(201)

    response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
   
    expect(response.statusCode).toBe(204)

    response = await agent 
        .delete('/api/user/' + otherUser.username + '/collection/Pikachu')

    expect(response.statusCode).toBe(403)

})




