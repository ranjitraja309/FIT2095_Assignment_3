const express = require('express'); //new instances to use later
const path = require('path');
const app = express();
const ejs = require('ejs');

// Added in mongoose instance
const mongoose = require('mongoose');

// URL for MongoDB Server
const url = 'mongodb://127.0.0.1:27017/A2_DB';

// Connecting to MongoDB client
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.error('Cannot Connect to MongoDB Successfully:', err));

const driverSchema = require('./driver');
const packageSchema = require('./packages');


const PORT = 8080;
const VIEWS_FOLDER = path.join(__dirname, 'views');

// Setting ejs as engine for html files
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Used to parse URLs (middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Running http://localhost:${PORT}`);
});

// Home page that now also displays the number of drivers and packages
app.get('/', async (req, res) => {
    try {
        const driverCount = await driverSchema.countDocuments();
        const packageCount = await packageSchema.countDocuments();

        res.render('index.html', { driverCount, packageCount });
    } catch (error) {
        res.status(500).send('Cannot get data');
    }
});

// List drivers GET request
app.get('/30628059/Ranjit/drivers', (req, res) => {
    res.render('listdrivers.html', { records: driversDB }); // records here will be used later during the add driver post
});

app.get('/30628059/Ranjit/drivers/new', (req, res) => {
    res.render('adddriver.html');
});

// New add drivers POST request 
app.post('/30628059/Ranjit/drivers/new', async (req, res) => {
    try {
        const newDriver = new driverSchema(req.body);
        await newDriver.save();
        res.redirect('/30628059/Ranjit/drivers');
    } catch (error) {
        res.status(500).send('Cannot add new driver');
    }
});

// New delete drivers GET request
app.get('/30628059/Ranjit/drivers/delete', async (req, res) => {
    try {
        const drivers = await driverSchema.find();
        res.render('deletedriver.html', { records: drivers });
    } catch (error) {
        res.status(500).send('Cannot get drivers data');
    }
});

// New delete drivers POST request
app.post('/30628059/Ranjit/drivers/delete', async (req, res) => {
    try {
        await driverSchema.findByIdAndDelete(req.body.driver_id);
        res.redirect('/30628059/Ranjit/drivers');
    } catch (error) {
        res.status(500).send('Cannot delete driver');
    }
});

// New List Packages GET request
app.get('/30628059/Ranjit/packages', async (req, res) => {
    try {
        const packages = await packageSchema.find();
        res.render('listpackages.html', { records: packages });
    } catch (error) {
        res.status(500).send('Cannot get packages data');
    }
});

// Add Package GET req
app.get('/30628059/Ranjit/packages/new', (req, res) => {
    res.render('addpackage.html');
});

// New add packages POST request
app.post('/30628059/Ranjit/packages/new', async (req, res) => {
    try {
        const newPackage = new packageSchema(req.body);
        await newPackage.save();
        res.redirect('/30628059/Ranjit/packages');
    } catch (error) {
        res.status(500).send('Cannot add new package');
    }
});

// New delete packages GET request
app.get('/30628059/Ranjit/packages/delete', async (req, res) => {
    try {
        const packages = await packageSchema.find();
        res.render('deletepackage.html', { records: packages });
    } catch (error) {
        res.status(500).send('Cannot delete package');
    }
});

// New delete packages POST request
app.post('/30628059/Ranjit/packages/delete', async (req, res) => {
    try {
        await packageSchema.findByIdAndDelete(req.body.packages_id);
        res.redirect('/30628059/Ranjit/packages');
    } catch (error) {
        res.status(500).send('Cannot delete package');
    }
});

// REST API - List packages in JSON
app.get('/30628059/Ranjit/api/v1/packages', async (req, res) => {
    try {
        const packages = await packageSchema.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Cannot get drivers data ' });
    }
});

// REST API - List drivers in JSON
app.get('/30628059/Ranjit/api/v1/drivers', async (req, res) => {
    try {
        const drivers = await driverSchema.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Cannot get packages data' });
    }
});

// Page not found Endpoint
app.get('*', (req, res) => {
    res.render('pagenoutfound.html');
});