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

