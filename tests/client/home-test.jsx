/*
        This file is based of the code from PG6301 lecture 7 and modified to fit my project
        LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/client/home-test.jsx
*/

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/home')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../my-test-utils');
const app = require('../../src/server/app')
const pokemonDao = require('../../src/server/db/pokemon')


test('Test failed fetch',async () => {
    
    stubFetch(500,{},null)

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
            <Home setLoginStatus={() => {}} username={null} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()

    expect(html).toMatch('500 Internal server error')
})


test('Display a pokemon',async () => {

    const response = [
        {
            name: 'Pikachu',
            img: './img/pikachu.png',
            description: 'Pikachu',
            type: 'Electric'
        }
    ]

    stubFetch(200,response,(url) => url.endsWith('/api/pokemons'))

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
             <Home setLoginStatus={() => {}} username={null} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()
    expect(html).toMatch('Pikachu')
    expect(html).toMatch('Electric')
})


test('Test display pokemons using the actual backend',async () => {

    pokemonDao.init()
    overrideFetch(app)
    
    const wrapper = mount (
        <MemoryRouter initialEntries={['/']}>
             <Home setLoginStatus={() => {}} username={null} />
        </MemoryRouter>
    )

    const predicate = () => {
        wrapper.update()
        const allpokemons = (wrapper.find('.collection-item').length >= 1)
        return allpokemons
    }

    const isPokemonDisplayed = await asyncCheckCondition(predicate,3000,200)
    expect(isPokemonDisplayed).toBe(true)

    const pokemons = pokemonDao.getAllPokemon()
    const html = wrapper.html()

    for(let i = 0; i < pokemons.length; i++) {
        expect(html).toMatch(pokemons[i].name)
    }


})