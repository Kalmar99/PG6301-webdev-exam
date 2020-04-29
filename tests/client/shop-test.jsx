/*
        This file is based of the code from PG6301 lecture 7 but i have modified it to fit my project
        LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/client/home-test.jsx
*/

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Shop} = require('../../src/client/shop')
const request = require('supertest');

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../my-test-utils');
const app = require('../../src/server/app')
const userDao = require('../../src/server/db/user')
const lootDao = require('../../src/server/db/loot')
const pokemonDao = require('../../src/server/db/pokemon')


test('Test failed fetch',async () => {

    stubFetch(500,{},null)
    const wrapper = mount(
        <MemoryRouter>
            <Shop setLoginStatus={() => {}} 
                username={'LoggedInUser'} 
                fetchUser={(done) => {
                    done({username:'LoggedInUser'})
                    }} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()
    expect(html).toMatch('500 Internal server error');

})

test('Test display a pokeball with stubFetch',async () => {

    const payload = [
        {
            name: 'Pokeball',
            cost: 1000,
            img: "./img/pokeballs/pokeball.png",
            count: 1,
            pokemon: ['Pikachu']
            
        }
    ]

    stubFetch(200,payload,null)

    const wrapper = mount(
        <MemoryRouter>
             <Shop setLoginStatus={() => {}} 
                username={'LoggedInUser'} 
                fetchUser={(done) => {
                    done({username:'LoggedInUser'})
                    }} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()
    expect(html).toMatch("Pokeball")

})

test('Test display pokeball from backend',async () => {

    lootDao.init()
    userDao.createUser('Bar','Foo')
    const user = userDao.getUser('Bar')

    //Get the user agent
    const agent = request.agent(app)

    //Log in
    let response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(204)

    
    overrideFetch(null,agent)

    const wrapper = mount(
        <MemoryRouter>
             <Shop setLoginStatus={() => {}} 
                username={'Bar'} 
                fetchUser={(done) => {
                    done({username:'Bar'})
                    }} />
        </MemoryRouter>
    )

    let predicate = () => {
        wrapper.update()
        const allpokeballs = (wrapper.find('.poke-ball').length >= 1)
        return allpokeballs
    }

    const isPokeballDisplayed = await asyncCheckCondition(predicate,3000,200)
    
    expect(isPokeballDisplayed).toBe(true)

})

test ('Test click on buy button',async () => {
    
    lootDao.init()
    userDao.createUser('Bar','Foo')
    const user = userDao.getUser('Bar')

    //Get the user agent
    const agent = request.agent(app)

    //Log in
    let response = await agent
        .post('/api/login')
        .send(user)
        .set('Content-Type','application/json')
    
    expect(response.statusCode).toBe(204)

    
    overrideFetch(null,agent)

    const wrapper = mount(
        <MemoryRouter>
             <Shop setLoginStatus={() => {}} 
                username={'Bar'} 
                fetchUser={(done) => {
                    done({username:'Bar'})
                    }}
                history={[]} />
        </MemoryRouter>
    )

    let predicate = () => {
        wrapper.update()
        const allpokeballs = (wrapper.find('.poke-ball').length >= 1)
        return allpokeballs
    }

    const isPokeballDisplayed = await asyncCheckCondition(predicate,3000,200)
    
    expect(isPokeballDisplayed).toBe(true)

    //Simulate click on buy button
    const buyButton = wrapper.find('.btnPokeball')
    buyButton.simulate('click')

    
    response = await agent 
        .get('/api/user/' + user.username + '/lootboxes')
    
    expect(response.body[0].count).toBe(4)
})