const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const listSongs = require('./routes/listSongs');
const users = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/lists', listSongs);
app.use('/api/login', users);


module.exports = app;

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
});

