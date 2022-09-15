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
        request.post(url, { body: {name : "Flor's List"}, headers: { 'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZmxvcmNpdGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6InJhbmRvbUlkIn0sImlhdCI6MTY2MzI0NTAzOX0.QFGQG4yvhXRseh5p6IcJ-ZnVyWn0XCW41J0kLnoDjGg'} },  function(error, response, body) {
            
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.body).status).to.equal(true);
            expect(JSON.parse(response.body).errors).to.equal(null);
            done();
        });
    });
});

