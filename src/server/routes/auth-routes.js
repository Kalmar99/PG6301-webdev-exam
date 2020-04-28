/*
        This file is based of the code from PG6301 lecture 8 and modified to fit my project
        LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/server/routes.js
*/

const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../db/user')

router.post('/login',passport.authenticate('local'),(req,res) => {
    res.status(204).send();
})

router.post('/logout',function(req,res) {
    req.logOut()
    res.status(204).send()
})

router.post('/signup',function(req,res) {

    const created = user.createUser(req.body.username,req.body.password)

    if(!created) {
        res.status(400).send();
    } 

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
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
            coins: req.user.coins
        })
    }
    res.status(401).send()
})

router.get('/user/collection',async (req,res) => {
    
    if(req.user) {
        res.json({collection: req.user.collection})
        return;
    } else {
        res.status(401).send()
        return;
    }
})

module.exports = router;