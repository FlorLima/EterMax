const expect  = require("chai").expect;
const { json } = require("body-parser");
var request = require("request");
const routeList = require('../api/routes/listSongs');
const routeUser = require('../api/routes/user');


describe("Login", function() {
    const url = "http://localhost:3000/api/login/";
    const body = {
        "email": "florcita@gmail.com",
        "password":"123",
        "id":"randomId"
    }
    it("it generates a token according to the credencials", function(done) {
        request.post(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
  
    });
});

describe("Song Lists", function() {

    const expectedResult = {
        status: true,
        lists: []
    };

    const url = "http://localhost:3000/api/lists/";
    it("It gets all the existing lists", function(done) {
        request.get(url, { 'auth': { 'bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0MzE4NH0.VH7KcVWNzxsQFpbC6khn_tJVIFekTwkza6GqZdJSj_U'}} ,function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.body).status).to.equal(expectedResult.status);
            expect(JSON.parse(response.body).lists.length).to.equal(expectedResult.lists.length);
            done();
        });
    });
});


describe("Create List", function() {

    const url = "http://localhost:3000/api/lists/";

    it("Creates a new list", function(done) {
        request.post(url, { json: {name : "Flor's List"}, headers: { 'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0NTAzOX0.QFGQG4yvhXRseh5p6IcJ-ZnVyWn0XCW41J0kLnoDjGg'} },  function(error, response, body) {
            console.log(response)
            expect(response.statusCode).to.equal(200);
            expect(response.body.status).to.equal(true);
            expect(response.body.errors).to.equal(null);
            done();
        });
    });
});

describe("Add song", function() {

    const url = "http://localhost:3000/api/lists/";
    const body = {
        name: "Flor's List",
        newSong: {
            title:"Flor title 1",
            artist:"Flor artist 1",
            album:"Flor album 1"
        }
    }

    const body2 = {
        name: "Flor's List",
        newSong: {
            title:"Flor title 2",
            artist:"Flor artist 2",
            album:"Flor album 2"
        }
    }
    it("Add a song to an existing list", function(done) {
        request.put(url, { json: body, headers: { 'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0NTAzOX0.QFGQG4yvhXRseh5p6IcJ-ZnVyWn0XCW41J0kLnoDjGg'} },  function(error, response, body) {
            console.log(response)
            expect(response.statusCode).to.equal(200);
            expect(response.body.status).to.equal(true);
            expect(response.body.errors).to.equal(null);
            done();
        });
    });

    it("Add a song to an existing list", function(done) {
        request.put(url, { json: body2, headers: { 'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0NTAzOX0.QFGQG4yvhXRseh5p6IcJ-ZnVyWn0XCW41J0kLnoDjGg'} },  function(error, response, body) {
            console.log(response)
            expect(response.statusCode).to.equal(200);
            expect(response.body.status).to.equal(true);
            expect(response.body.errors).to.equal(null);
            done();
        });
    });
});

describe("Delete song", function() {

    const url = "http://localhost:3000/api/lists/song";
    const body = {
        name: "Flor's List",
        song:{
            title: "Flor title 1",
            artist: "Flor artist 1",
            album: "Flor album 1"
        }
        
    }
    it("Delete a song from an existing list", function(done) {
        request.delete(url, { json: body, headers: { 'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0NTAzOX0.QFGQG4yvhXRseh5p6IcJ-ZnVyWn0XCW41J0kLnoDjGg'} },  function(error, response, body) {
            console.log(response.body)
            expect(response.statusCode).to.equal(200);
            expect(response.body.status).to.equal(true);
            expect(response.body.errors).to.equal(null);
            expect(response.body.deletedItem.title).to.equal("Flor title 1");
            expect(response.body.deletedItem.artist).to.equal("Flor artist 1");
            expect(response.body.deletedItem.album).to.equal("Flor album 1");
            done();
        });
    });
});

describe("Delete list", function() {

    const url = "http://localhost:3000/api/lists/";
    const body = {
        name: "Flor's List"
    }

    it("Delete a list ", function(done) {
        request.delete(url, { json: body, headers: { 'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0NTAzOX0.QFGQG4yvhXRseh5p6IcJ-ZnVyWn0XCW41J0kLnoDjGg'} },  function(error, response, body) {

            expect(response.statusCode).to.equal(200);
            expect(response.body.status).to.equal(true);
            expect(response.body.deletedItem.name).to.equal("Flor's List");
            expect(response.body.deletedItem.songs[0].title).to.equal("Flor title 2");
            expect(response.body.deletedItem.songs[0].artist).to.equal("Flor artist 2");
            expect(response.body.deletedItem.songs[0].album).to.equal("Flor album 2");
            done();
        });
    });
});
