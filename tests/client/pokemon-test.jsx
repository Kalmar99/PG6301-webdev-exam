/*
        This file is based of the code from PG6301 lecture 7 but i have modified it to fit my project
        LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/client/home-test.jsx
*/


const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Pokemon} = require('../../src/client/pokemon')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition,overrideUrlParams} = require('../my-test-utils');
const app = require('../../src/server/app')
const pokemonDao = require('../../src/server/db/pokemon')


test('Test failed fetch',async () => {
    
    stubFetch(500,{},null)

    const wrapper = mount(
        <MemoryRouter initialEntries={['/pokemon']}>
            <Pokemon />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()
    expect(html).toMatch('Something went wrong, code: 500')

})

test('Test successfull fetch with stubFetch',async () => {
    
    const payload = {
        name: 'Pikachu',
        img:'',
        description: 'Shoots Lightning',
        type: 'Electric'
    }

    stubFetch(200,payload,null)

    const wrapper = mount(
        <MemoryRouter initialEntries={['/pokemon?n=Pikachu']}>
            <Pokemon setLoginStatus={() => {}} />
        </MemoryRouter>
    )

    await flushPromises()

    const html = wrapper.html()

    expect(html).toMatch('Pikachu')

})

test('Test fetch pokemon with backend',async () => {

    pokemonDao.init()

    overrideUrlParams('pokemon?n=Pikachu')
    overrideFetch(app)
    

    const wrapper = mount (
        <MemoryRouter initialEntries={['/pokemon?n=Pikachu']}>
             <Pokemon setLoginStatus={() => {}} username={null} />
        </MemoryRouter>
    )

    const predicate = () => {
        wrapper.update()
       
        const pokemon = (wrapper.find('.pokemon').length >= 1)
        return pokemon
    }

    const isPokemonDisplayed = await asyncCheckCondition(predicate,3000,200)
    expect(isPokemonDisplayed).toBe(true)

    const html = wrapper.html() 

    expect(html).toMatch('Pikachu')

})