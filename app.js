const express = require('express'); //new instances to use later
const path = require('path');
const app = express();
const ejs = require('ejs');
const Driver = require('./driver');
const Package = require('./package');

const PORT = 8080;
const VIEWS_FOLDER = path.join(__dirname, 'views');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let driversDB = [];
let packagesDB = [];

app.listen(PORT, () => {
    console.log(`running http://localhost:${PORT}`);
});

// Page not found Endpoint
app.get("*", function (request, response) {
	response.render('pagenoutfound.html');
});

// Home Page Endpoint
app.get('/', (req, res) => {
    res.render('index.html');
});

//List Drivers Endpoint
app.get('/30628059/Ranjit/drivers', (req, res) => {
    res.render('listdrivers.html', { records : driversDB }); // records here will be used later during the add driver post
});

// Add Driver GET req
app.get('/30628059/Ranjit/drivers/new', (req, res) => {
    res.render('adddriver.html');
});

// Add Driver POST req
app.post('/30628059/Ranjit/drivers/new', (req, res) => {
    let newDriver = new Driver(req.body.driver_name, req.body.driver_department, req.body.driver_license, req.body.driver_driver_isActive);
    driversDB.push(newDriver);
    res.redirect('/30628059/Ranjit/drivers')
});

// Delete Driver GET req
app.get('/30628059/Ranjit/drivers/delete', (req, res) => {
    res.render('deletedriver.html', { records: driversDB });
});

// For incorrect Driver ID deletion
app.get('/30628059/Ranjit/drivers/delete/IDcheck', (req, res) => {
    const driverId = req.query.driver_id;
    
    if (driversDB.findIndex(driver => driver.driver_id === driverId) === -1) {// if there is a mismatch in the ID - will redirect to invalid data page
        res.render('invaliddata.html');
    } else {
        driversDB.splice(driverIndex, 1);  //if ID is correct, it will remove from driversDB
        res.redirect('/30628059/Ranjit/drivers');
    }
});

// Delete Driver POST req
app.post('/30628059/Ranjit/drivers/delete', (req, res) => {
    const driverId = req.body.driver_id;
    driversDB = driversDB.filter(driver => driver.driver_id !== driverId);  
    res.redirect('/30628059/Ranjit/drivers');
});