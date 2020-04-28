
const express = require('express');
const router = express.Router();
const pokemon = require('../db/pokemon')


// This endpoint should be open for everyone regardless if their logged in
router.get('/pokemons',(req,res) => {
    const pokemons = pokemon.getAllPokemon()
    res.json(pokemons);
})

module.exports = router;