const users = new Map()
let counter = 0;

const createUser = (username,password) => {
    
    const user = {
        id: (counter++),
        username: username,
        password: password,
        coins: 1000,
        collection: []
    }
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

const removeFromCollection = (username,pokemon) => {
    
    const user = getUser(username)

    //Check if pokemon alrady exists in collection
    user.collection.forEach((pokemonInC) => {
        if(pokemonInC.name === pokemon.name) {
            pokemonInC.count--;
            return;
        }
    })

    const position = array.indexOf(pokemon);
    user.collection.splice(position,1);
    return;
}

const addToCollection = (username,pokemon) => {
    
    const user = getUser(username)

    //Check if pokemon already exists in collection
    user.collection.forEach((pokemonInC) => {
        if(pokemonInC.name === pokemon.name) {
            pokemonInC.count++;
            return;
        }
    })

    user.collection.push(pokemon)
    return;
}

module.exports = {createUser,getUser,verifyUser,addToCollection,removeFromCollection}