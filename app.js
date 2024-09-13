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

const Driver = require('./models/Driver');
const Package = require('./models/Package');
const driverSchema = require('./models/driverSchema');
const packageSchema = require('./models/packageSchema');


const PORT = 8080;
const VIEWS_FOLDER = path.join(__dirname, 'views');

// Setting ejs as engine for html files
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Used to parse URLs (middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

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

// New list drivers GET request
app.get('/30628059/Ranjit/drivers', async (req, res) => {
    try {
        const drivers = await driverSchema.find();
        res.render('listdrivers.html', { records: drivers });
    } catch (error) {
        res.status(500).send('Cannot get drivers data');
    }
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

// RESTful API - List packages in JSON
app.get('/30628059/Ranjit/api/v1/packages', async (req, res) => {
    try {
        const packages = await packageSchema.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Cannot get drivers data ' });
    }
});

// RESTful API - List drivers in JSON
app.get('/30628059/Ranjit/api/v1/drivers', async (req, res) => {
    try {
        const drivers = await driverSchema.find()
            .populate('assigned_packages')
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Cannot get packages data' });
    }
});

// RESTful API - Add a new driver
app.post('/30628059/Ranjit/api/v1/drivers/new', async (req, res) => {
    try {
        const { driver_name, driver_department, driver_license, driver_isActive } = req.body;

        // To get driver ID, I create a new driver instance
        const driverInstance = new Driver(driver_name, driver_department, driver_license, driver_isActive);

        // Creating a new Driver instance
        const newDriver = new driverSchema({
            _id: new mongoose.Types.ObjectId(),
            driver_id: driverInstance.driver_id,
            driver_name,
            driver_department,
            driver_license,
            driver_isActive
        });

        await newDriver.save();

        // Respond with the newly created driver data
        res.status(201).json({
            id: newDriver._id,
            driver_id: newDriver.driver_id
        });
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ error: 'Cannot add new driver' });
    }
});

// RESTful API - Delete a driver by their ID
app.delete('/30628059/Ranjit/api/v1/drivers/delete/:_id', async (req, res) => {
    try {
        const driverId = req.params._id; // Directly use the string ID

        // Delete the driver
        const deletedDriver = await driverSchema.findByIdAndDelete(driverId);
        if (!deletedDriver) {
            return res.status(404).json({ error: 'Cannot find driver' });
        }

        // Delete the driver's assigned packages
        const deletedPackages = await packageSchema.deleteMany({
            _id: { $in: deletedDriver.assigned_packages }
        });

        // Return the desired JSON statements
        res.json({
            acknowledged: true,
            deletedCount: 1
        });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ error: 'Cannot delete driver' });
    }
});

app.put('/30628059/Ranjit/api/v1/drivers/update', async (req, res) => {
    try {
        const { id, driver_license, driver_department } = req.body;

        if (!id || !driver_license || !driver_department) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Update the driver with the new license and department
        const updatedDriver = await driverSchema.findByIdAndUpdate(
            id,
            { driver_license, driver_department },
            { new: true, runValidators: true } // Options: return the updated document, and validate update
        );

        if (!updatedDriver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        // Return the updated driver
        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ error: 'Cannot update driver' });
    }
});