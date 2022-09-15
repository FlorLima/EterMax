const express = require('express')
const UserService = require('./../services/UserService')
const router = express.Router();

const userService = new UserService.userService('secretkey')

router.post('/' ,(request, response) => {
    const user = request.body;
    console.log(user)
    response.json(userService.Authenticate(user));
});




module.exports = router;