/*
    File is based on code from lecture 7 but modified to fit my project
    LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/server/app-test.js
*/

const request = require('supertest')
const app = require('../../src/server/app')
const pokemonDao = require('../../src/server/db/pokemon')

beforeEach(() => {pokemonDao.init()})

test ('Test get all pokemon',async () => {

    const response = await request(app).get('/api/pokemons')
    
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(1)

})

test('Test get one single pokemon',async () => {

    const pokemon = "Pikachu"
    const response = await request(app).get('/api/pokemons/' + pokemon)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(pokemon)
})

