
const pokemons = new Map()
let counter = 0;

const createPokemon = (name,type,millworth,img,description) => {
    const pokemon = {
        id: (counter++),
        img: img,
        name: name,
        type: type,
        millworth: millworth,
        description: description
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
    createPokemon("Pikachu","Electric",1000,"./img/pikachu.png","Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge.")
    createPokemon("Charmander","Fire",2000,"./img/charmander.png","The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.")
    createPokemon("Squirtle","Water",1000,"./img/squirtle.png","Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.")
}


module.exports = {createPokemon,getAllPokemon,getPokemon,init}