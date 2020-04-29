
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
    //Pokeball
    createPokemon("Pikachu","Electric",1500,"./img/pikachu.png","Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge.")
    createPokemon("Charmander","Fire",1500,"./img/charmander.png","The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.")
    createPokemon("Squirtle","Water",1500,"./img/squirtle.png","Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.")
    
    //Greatball
    createPokemon("Caterpie","Grass",2000,"./img/caterpie.png","Caterpie has a voracious appetite. It can devour leaves bigger than its body right before your eyes. From its antenna, this Pokémon releases a terrifically strong odor.");
    createPokemon("Rattata","Normal",2000,'./img/rattata.png',"Rattata is cautious in the extreme. Even while it is asleep, it constantly listens by moving its ears around. It is not picky about where it lives—it will make its nest anywhere.");
    createPokemon("Nidorina","Poison",2000,'./img/nidorina.png',"When Nidorina are with their friends or family, they keep their barbs tucked away to prevent hurting each other. This Pokémon appears to become nervous if separated from the others.");
    
    //Ultraball
    createPokemon("Blastoise","Water",2500,'./img/blastoise.png',"Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.");
    createPokemon("Ninetales","Fire",2500,'./img/ninetales.png',"Ninetales casts a sinister light from its bright red eyes to gain total control over its foe's mind. This Pokémon is said to live for a thousand years.");
    createPokemon("Persian","Normal",2500,"./img/persian.png","Persian has six bold whiskers that give it a look of toughness. The whiskers sense air movements to determine what is in the Pokémon's surrounding vicinity. It becomes docile if grabbed by the whiskers.");

}


module.exports = {createPokemon,getAllPokemon,getPokemon,init}