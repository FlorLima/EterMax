const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const example = require('./routes/example');
const listSongs = require('./routes/listSongs')


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/example', example);
app.use('/api/listSongs', listSongs);


module.exports = app;

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
});

