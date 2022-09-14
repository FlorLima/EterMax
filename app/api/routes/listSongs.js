const express = require('express')
const Repository = require('../repositories/ListRepository');
const Service = require('../services/ListService');
const Validator = require('../services/Validator');
const  Validations = require('../services/Validation');


const router = express.Router();
const listSongService = new  Service(new Repository(), new Validator([new Validations.ValidationTitle(), new Validations.ValidationAlbum(), new Validations.ValidationArtist()]), new Validator([ new Validations.ValidationList()]));

router.get('/lists' ,(request, response) => {
    response.send(listSongService.GetLists());
});

router.post('/', (request, response) => {
    console.log(request.body['name'])
    response.send(listSongService.AddList(request.body['name']));
});

router.put('/', (request, response) => {
    response.send(listSongService.AddSong(request.body['name'], request.body['newSong']));
});

router.delete('/', (request, response) => {
    response.send(listSongService.DeleteList(request.body['name']));
});


module.exports = router;