/*
        This file is based of the code from PG6301 lecture 8 and modified to fit my project
        LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/server/routes.js
*/

const express = require('express');
const router = express.Router();
const passport = require('passport');
const userDao = require('../db/user');
const pokemonDao = require('../db/pokemon');
const lootDao = require('../db/loot')

router.post('/login',passport.authenticate('local'),(req,res) => {
    res.status(204).send();
})

router.post('/logout',function(req,res) {
    req.logOut()
    res.status(204).send()
})

router.post('/signup',function(req,res) {

    const created = userDao.createUser(req.body.username,req.body.password)

    if(!created) {
        res.status(400).send();
    } 

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                console.log(err)
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
})

router.get('/user',(req,res) => {
    if(req.user) {
        res.json({
            username: req.user.username,
            coins: req.user.coins,
            loot: req.user.loot
        })
    }
    res.status(401).send()
})


router.put('/user',(req,res) => {
    
    if(req.user) {
       
        userDao.updateUser(req.user.username,req.user.password)
        res.status(204).send()
    }

    res.status(401).send()
}) 

router.get('/user/:name/collection',async (req,res) => {
    
    const name = req.params['name']

    if(req.user) {
        
        //Make sure whoever sends the request owns that collection
        if(req.user.username === name) {
            
            const userObj = userDao.getUser(req.user.username)
            if(userObj) {
                res.json({collection: userObj.collection })
                return;
            } else {
                res.status(404).send()
            }
   
        } else {
            res.status(401).send()
            return;
        }

    } else {
        res.status(401).send()
        return;
    }
})

router.get('/user/:name/lootboxes',(req,res) => {
    
    const username = req.params['name']
    const user = userDao.getUser(username);

    if(req.user) {
        if(req.user.username === username) {
            if(user) {
                res.json(user.loot)
                return;
            }
            res.status(404).send()
            return;
        }
        res.status(401).send()
    }
    res.status(401).send()
    return;
})

router.post('/user/:name/lootboxes/:lootbox',(req,res) => {
    
    const user = userDao.getUser(req.params['name']);
    const lootbox = lootDao.getLootBox(req.params['lootbox']);
    let pokemon = lootbox.pokemon[Math.floor(Math.random() * lootbox.pokemon.length)]
    pokemon = pokemonDao.getPokemon(pokemon)

    if(req.user) {
        if(req.user.username == user.username) {
        if(user && lootbox) {
            if(userDao.removeLoot(user,lootbox)) {
                //If the user has to lootbox, add pokemon to collection
                userDao.addToCollection(user.username,pokemon)
                res.status(201)
                res.json(pokemon);
                res.send()
                return;
            } else {
                //If the user doesent have the loot box
                res.status(403).send()
                return;
            }
        } else {
            res.status(404).send()
            return;
        }
    }
    //The loot box does not belong to the player making the request
    res.status(403).send()
    return;
    }
    res.status(401).send()
    return;
})

/*
    I was in doubt if this should be put or delete. 
    If there is multiple pokemons of the same type in the collection then it will only update the count
    but if there is only one it will delete it. I landed on delete since that seemed most logical to me in the end.
*/

router.delete('/user/:name/collection/:pokemon', (req,res) => {

    const name = req.params['name']
    const pokemonName = req.params['pokemon']
    const pokemon = pokemonDao.getPokemon(pokemonName)

    if(req.user) {
        
        if(req.user.username === name) {
            const userObj = userDao.getUser(req.user.username)
            
            if(userObj && pokemon) {
                userDao.millFromCollection(userObj.username,pokemonName)
                res.status(204).send()
            } else {
                res.status(404).send()
            }
        } else {
            res.status(403).send()
            return;
        }
    }
    res.status(401).send()
    return;
})


module.exports = router;