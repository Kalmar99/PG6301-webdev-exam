const express = require('express');
const router = express.Router();
const passport = require('passport');
const userDao = require('../db/user');
const pokemonDao = require('../db/pokemon');
const lootDao = require('../db/loot')

//Should be open to everone
router.get('/lootboxes',(req,res) => {
    res.json(lootDao.getAllLootBoxes());
})

//Should be open to everone
router.get('/lootboxes/:name',(req,res) => {
    
    const name = req.params['name']
    const lootbox = lootDao.getLootBox(name)
    if(lootbox) {
        res.json(lootbox)
        return;
    }

    res.status(404).send()
    
})

router.post('/lootboxes/:name',(req,res) => {
    
    const boxName = req.params['name']

    if(req.user) {
        const user = userDao.getUser(req.user.username)
        console.log(user)
        const lootbox = lootDao.getLootBox(boxName)
        if(user && lootbox) {
            if(user.coins >= lootbox.cost) {
                user.coins -= lootbox.cost;
                userDao.addLoot(user,lootbox)
                res.status(204).send()
                return;
            } else {
                res.status(403).send()
                return;
            }
        } else {
            res.status(404).send()
            return;
        }
    }
    res.status(401).send()
    return;
})

module.exports = router;