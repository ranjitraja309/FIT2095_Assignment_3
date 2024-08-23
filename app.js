const express = require('express'); //new instances to use later
const path = require('path');
const app = express();
const ejs = require('ejs');
const Driver = require('./driver');
const Packages = require('./packages');

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

// Delete Driver POST req
app.post('/30628059/Ranjit/drivers/delete', (req, res) => {
    const driverId = req.body.driver_id;
    driversDB = driversDB.filter(driver => driver.driver_id !== driverId);  
    res.redirect('/30628059/Ranjit/drivers');
});

// List Packages Endpoint
app.get('/30628059/Ranjit/packages', (req, res) => {
    res.render('listpackages.html', { records : packagesDB }); // records here will be used later during the add driver post
});

// Add Package GET req
app.get('/30628059/Ranjit/packages/new', (req, res) => {
    res.render('addpackage.html');
});

// Add Package POST req
app.post('/30628059/Ranjit/packages/new', (req, res) => {
    let newPackage = new Packages(req.body.packages_title, req.body.packages_weight, req.body.packages_destination, req.body.packages_description, req.body.packages_isAllocated, req.body.driver_id);
    packagesDB.push(newPackage);
    res.redirect('/30628059/Ranjit/packages')
});

// Delete Package GET req
app.get('/30628059/Ranjit/packages/delete', (req, res) => {
    res.render('deletepackage.html', { records: packagesDB });
});

// Delete Package POST req
app.post('/30628059/Ranjit/packages/delete', (req, res) => {
    const packageID = req.body.packages_id;
    packagesDB = packagesDB.filter(packages => packages.packages_id !== packageID);  
    res.redirect('/30628059/Ranjit/packages');
});

// Page not found Endpoint
app.get('*', (req, res) => {
	res.render('pagenoutfound.html');
});