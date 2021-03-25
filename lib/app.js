const express = require('express');
const app = express();

app.use(express.json());

app.use('/words', require('./controllers/words'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
