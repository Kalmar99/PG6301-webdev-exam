
const pokemons = new Map()
let counter = 0;

const createPokemon = (name,type,millworth,img) => {
    const pokemon = {
        id: (counter++),
        img: img,
        name: name,
        type: type,
        millworth: millworth
    }

    pokemons.set(name,pokemon)
}

const getPokemon = (name) => {
    return pokemons.get(name)
}

const getAllPokemon = () => {
    return Array.from(pokemons.values())
}


const init = () => {
    createPokemon("Pikachu","Electric",1000,"./img/pikachu.png")
    createPokemon("Charmander","Fire",2000,"./img/charmander.png")
    createPokemon("Squirtle","Water",1000,"./img/squirtle.png")
}


module.exports = {createPokemon,getAllPokemon,getPokemon,init}