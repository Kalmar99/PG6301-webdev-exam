const lootboxes = new Map()


const init = () => {
    createLootBox("Pokeball","./img/pokeballs/pokeball.png",["Pikachu","Charmander","Squirtle"],1000)
}

const createLootBox = (name,img,pokemon,cost) => {

    const lootbox = {
        name: name,
        cost: cost,
        img: img,
        count: 1,
        pokemon: pokemon
    }

    return lootboxes.set(name,lootbox)
}

const getLootBox = (name) => {
    return lootboxes.get(name)
}

const getAllLootBoxes = () => {
    return Array.from(lootboxes.values())
}

module.exports = {init,createLootBox,getLootBox,getAllLootBoxes}