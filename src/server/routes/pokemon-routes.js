
const express = require('express');
const router = express.Router();
const pokemonDao = require('../db/pokemon')
const userDao = require('../db/user')


// This endpoint should be open for everyone regardless if their logged in
router.get('/pokemons',(req,res) => {
    const pokemons = pokemonDao.getAllPokemon()
    res.json(pokemons);
})

//Everyone should have acess to this aswell
router.get('/pokemons/:name',(req,res) => {

    const name = req.params['name']
    const pokemon = pokemonDao.getPokemon(name)

    if(pokemon) {
        res.json(pokemon)
        return;
    }
    res.status(404).send()

})

/* Here i was not sure if i should use put or delete. If the player has more than 1 of a certain item in 
the collection its a update and if its only 1 item of that type in the collection then its a delete.
*/


module.exports = router;