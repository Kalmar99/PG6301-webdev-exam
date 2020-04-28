const app = require('./app')
const pokemon = require('./db/pokemon')
const user = require('./db/user')

const port = process.env.port || 8080;

app.listen(port,() => {
    console.log('Server started on port: ' + port)
    pokemon.init()
    user.createUser("user","123")
});