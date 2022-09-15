const express = require('express')
const Repository = require('../repositories/ListRepository');
const Service = require('../services/ListService');
const Validator = require('../services/Validator');
const  Validations = require('../services/Validation');
const UserService = require('./../services/UserService');

const router = express.Router();
//const jwt = require('jsonwebtoken');

const userService = new UserService.userService('secretkey');
const listSongService = new  Service( new Repository(), new Validator([new Validations.ValidationTitle(), new Validations.ValidationAlbum(), new Validations.ValidationArtist()]), new Validator([ new Validations.ValidationList()]));

router.get('/' , UserService.verify ,(request, response) => {

    if(userService.Verify(request.token) !== undefined){
        response.send(listSongService.GetLists(request.query));
    }else{
        response.sendStatus(403);
    }
});

router.post('/', (request, response) => {

    if(userService.Verify(request.token) !== undefined){
        response.send(listSongService.AddList(request.body['name']));
    }else{
        response.sendStatus(403);
    }
});

router.put('/', (request, response) => {

    if(userService.Verify(request.token) !== undefined){
        response.send(listSongService.AddSong(request.body['name'], request.body['newSong']));
    }else{
        response.sendStatus(403);
    }
});

router.delete('/', (request, response) => {
    if(userService.Verify(request.token) !== undefined){
        response.send(listSongService.DeleteList(request.body['name']));
    }else{
        response.sendStatus(403);
    }
});

router.delete('/song', (request, response) => {
    if(userService.Verify(request.token) !== undefined){
        response.send(listSongService.DeleteSong(request.body['name'], request.body['song']))
    }else{
        response.sendStatus(403);
    }
});



module.exports = router;