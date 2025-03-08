const express = require('express');
const app = express();
const port = 8080;
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('ram ram!');
});

app.listen(port, () => {
    console.log(`port ${port} is active`);
});