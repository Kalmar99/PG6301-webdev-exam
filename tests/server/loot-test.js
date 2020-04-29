const request = require('supertest')
const app = require('../../src/server/app')
const lootDao = require('../../src/server/db/loot')

beforeEach(() => {lootDao.init()})

test ('Test Get all lootboxes',async () => {
    const response = await request(app).get('/api/lootboxes')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
})

test('Test get spesific lootbox',async () => {
    const name = 'Pokeball'
    const response = await request(app).get('/api/lootboxes/' + name)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(name)
})

test('Test buy lootbox',async () => {
    
    const user = {
        username: 'testbuy',
        password: 'testbuy'
    }

    //Register
    let response = await request(app)
        .post('/api/signup')
        .send(user)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(201)

    const agent = request.agent(app)

    response = await agent 
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)

    const lootbox = 'Pokeball'

    response = await agent
        .post('/api/lootboxes/' + lootbox)
    
    expect(response.statusCode).toBe(204)
    

    //Check that user got lootbox
    response = await agent 
        .get('/api/user/'+user.username+'/lootboxes')
    
    expect(response.statusCode).toBe(200)
    expect(response.body[0].count).toBeGreaterThan(3);
 
}) 