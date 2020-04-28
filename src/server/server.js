const app = require('./app')
const pokemon = require('./db/pokemon')
const user = require('./db/user')
const loot = require('./db/loot')

const port = process.env.port || 8080;

app.listen(port,() => {
    console.log('Server started on port: ' + port)
    loot.init()
    pokemon.init()
    user.createUser("user","123")
    const poke = pokemon.getPokemon("Pikachu")
    user.addToCollection("user",poke)
    user.addToCollection("user",poke)
});