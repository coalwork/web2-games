const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(80);
console.log('App is listening on port 80');

// TODO: Move this project to Heroku
