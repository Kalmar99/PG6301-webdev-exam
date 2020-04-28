
const express = require('express');
const router = express.Router();
const pokemonDao = require('../db/pokemon')


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

module.exports = router;