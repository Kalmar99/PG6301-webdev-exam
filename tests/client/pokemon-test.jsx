const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Pokemon} = require('../../src/client/pokemon')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../my-test-utils');
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