const pokemonDao = require('./pokemon')


const users = new Map()
let counter = 0;

const createUser = (username,password) => {
    
    const pokeball = {
        name: "Pokeball",
        cost: 5000,
        img: "./img/pokeballs/pokeball.png",
        count: 3,
        pokemon: ["Pikachu","Charmander","Squirtle"]
    }
    
    const user = {
        id: (counter++),
        username: username,
        password: password,
        coins: 1000,
        loot: [],
        collection: []
    }
    user.loot.push(pokeball)
  
    return users.set(username,user)

}

const getUser = (username) => {
    return users.get(username)
}

const verifyUser = (username,password) => {
    
    const user = getUser(username)

    if(!user) {
        return false;
    } else {
        return user.password === password;
    }

}

const updateUser = (username,password) => {
    const newUser = createUser(username,password)
    users.set(newUser.username,newUser);
}

const millFromCollection = (username,pokemon) => {
    
    const user = getUser(username)
    
  
    const pokemonObject = pokemonDao.getPokemon(pokemon)

    removeFromCollection(username,pokemonObject)
    user.coins += pokemonObject.millworth;
    

}

const removeFromCollection = (username,pokemon) => {
    
    const user = getUser(username)
    
    const position = user.collection.indexOf(pokemon);

    //Does the pokemon exist?
    for(let i = 0; i < user.collection.length; i++) {
        if(user.collection[i].name === pokemon.name) {
            if(user.collection[i].count > 1) {
                user.collection[i].count--;
                return;
            } else {
                user.collection.splice(position,1)
                return;
            }
            
        }
    }
 
    user.collection.splice(position,1);
    return true;  
}

const addToCollection = (username,pokemon) => {
    
    const user = getUser(username)

    //Check if pokemon already exists in collection

    for(let i = 0; i < user.collection.length; i++) {
        if(user.collection[i].name === pokemon.name) {
            user.collection[i].count++;
            return;
        }
    }

    user.collection.push(pokemon)
    return;
}


const addLoot = (user,box) => {
        
    for(let i = 0; i < user.loot.length; i++) {
        if(user.loot[i].name === box.name) {
            user.loot[i].count++;
            return;
        }
    }

    user.loot.push(box)
    return;
}


const removeLoot = (user,box) => {

    for(let i = 0; i < user.loot.length; i++) {
        if(user.loot[i].name === box.name) {
            
            if(user.loot[i].count > 1) {
                user.loot[i].count--;
                return true;
            } else {
                user.loot.splice(i,1)
                return true;
            }
        }
    }
    return false;
}
 

module.exports = {createUser,getUser,verifyUser,addToCollection,removeFromCollection,millFromCollection,removeLoot,addLoot,updateUser}