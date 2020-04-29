const app = require('./app')
const pokemon = require('./db/pokemon')
const user = require('./db/user')
const loot = require('./db/loot')

const port = process.env.port || 8080;

app.listen(port,() => {
    console.log('Server started on port: ' + port)
    
    //Set up pokeballs and pokemon
    loot.init()
    pokemon.init()

    //Create a example user
    user.createUser("foo","bar")
    
});