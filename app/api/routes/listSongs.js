const express = require('express')
const Repository = require('../repositories/ListRepository');
const Service = require('../services/ListService');


const router = express.Router();
const listSongService = new  Service(new Repository());

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

module.exports = router;