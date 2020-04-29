const request = require('supertest')
const app = require('../../src/server/app')
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

    const username = 'user-'+(id++)

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
    
    const username = 'user-'+(id++)

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



