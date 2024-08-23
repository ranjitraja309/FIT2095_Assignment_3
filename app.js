const express = require('express'); //new instances to use later
const path = require('path'); 
const app = express(); 
const ejs = require('ejs'); 

const PORT = 8080; 
const VIEWS_FOLDER = path.join(__dirname, 'views'); 

app.engine('html', ejs.renderFile); 
app.set('view engine', 'html'); 

app.use(express.urlencoded({extended: true})); 
app.use(express.static('public')); 

const drivers = []; 
const packages = []; 

app.listen(PORT, () => {
    console.log(`running http://localhost:${PORT}`);
});

