require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express()
const path = require('path');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (req,res) => {
    const recipe = await axios.get(`https://api.edamam.com/search?q=${req.query.search}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
    let hits = recipe.data.hits;
    let query = req.query.search;
    res.render('home', {hits, query})

})

app.listen(3000, (req,res) => {
    console.log("Port listening in 3000")
})