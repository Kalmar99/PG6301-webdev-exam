const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Collection} = require('../../src/client/collection')
const request = require('supertest');

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../my-test-utils');
const app = require('../../src/server/app')
const userDao = require('../../src/server/db/user')
const lootDao = require('../../src/server/db/loot')
const pokemonDao = require('../../src/server/db/pokemon')


test('Test failed fetch',async () => {
    
    stubFetch(500,{},null)

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
            {/* Here i have to trick the page to belive i am logged in. otherwise it wont do the fetch */}
            <Collection setLoginStatus={() => {}} 
                username={'LoggedInUser'} 
                fetchUser={(done) => {
                    done({username:'LoggedInUser'})
                    }} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()

    expect(html).toMatch('Something went wrong, code:500')
})

test('Test display a collection item', async () => {
    

    const response = {
        collection: [
            {
                name: 'Pikachu',
                img: './img/pikachu.png',
                description: 'Pikachu',
                type: 'Electric' 
            }
        ]
    }

    stubFetch(200,response,(url) => url.endsWith('/api/user/LoggedInUser/collection'))

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
             <Collection setLoginStatus={() => {}} 
                username={'LoggedInUser'} 
                fetchUser={(done) => {
                    done({username:'LoggedInUser'})
                    }} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()
    expect(html).toMatch('Pikachu')
    expect(html).toMatch('Electric')
})


test('Test display a collection using the backend',async () => {
    
    pokemonDao.init();
    lootDao.init()

    // Setting up user and adding all pokemon to collection
    userDao.createUser("LoggedInUser","123")

    const user = userDao.getUser("LoggedInUser")

    const pokemon = pokemonDao.getAllPokemon()

    pokemon.forEach((p) => {
        userDao.addToCollection(user.username,p)
    })

    const agent = request.agent(app)

    //Need to log in or the server will reject the request
    const response = await agent 
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(204)

    //Using the same user agent to perform the fetch
    overrideFetch(null,agent)
    
    const fakeUserPayLoad = {
        username: user.username
    }

    const wrapper = mount (
        <MemoryRouter initialEntries={['/collection']}>
             <Collection setLoginStatus={() => {}} 
                username={user.username} 
                fetchUser={(done) => {
                    done(fakeUserPayLoad)
                    }} />
        </MemoryRouter>)

        let predicate = () => {
            wrapper.update()
            const allpokemons = (wrapper.find('.poke-collection').length >= 1)
            return allpokemons
        }
    
        const isPokemonDisplayed = await asyncCheckCondition(predicate,3000,200)
        
        expect(isPokemonDisplayed).toBe(true)
    
        const pokemons = pokemonDao.getAllPokemon()
        const html = wrapper.html()
    
        for(let i = 0; i < pokemons.length; i++) {
            expect(html).toMatch(pokemons[i].name)
        }


        //Checking if a lootbox appear
        predicate = () => {
            wrapper.update()
            const allLoot = (wrapper.find('.loot').length >= 1)
            return allLoot
        }
    
        const isLootDisplayed = await asyncCheckCondition(predicate,3000,200)
        expect(isLootDisplayed).toBe(true)


})


test('Test display not logged in', async () => {
    
    stubFetch(401,{},null)

    const wrapper = mount (
        <MemoryRouter initialEntries={['/collection']}>
             <Collection setLoginStatus={() => {}} 
                username={{}} 
                fetchUser={(done) => {
                    done({})
                    }} />
        </MemoryRouter>)
    
    await flushPromises()

    const html = wrapper.html()

    expect(html).toMatch('You need to be logged in to see this page!')


})

   






