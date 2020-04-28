const userDao = require('./user')


const pokemons = new Map()
let counter = 0;

const createPokemon = (name,type,millworth,img,description) => {
    const pokemon = {
        id: (counter++),
        img: img,
        name: name,
        count: 1,
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
    createPokemon("Caterpie","Grass",1000,"./img/caterpie.png","Caterpie has a voracious appetite. It can devour leaves bigger than its body right before your eyes. From its antenna, this Pokémon releases a terrifically strong odor.");
    createPokemon("Rattata","Normal",500,'./img/rattata.png',"Rattata is cautious in the extreme. Even while it is asleep, it constantly listens by moving its ears around. It is not picky about where it lives—it will make its nest anywhere.");
}


module.exports = {createPokemon,getAllPokemon,getPokemon,init}