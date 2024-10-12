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

const Driver = require('./models/driver');
const Package = require('./models/package');
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
/*app.get('/', async (req, res) => {
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
    console.log('Received request to add new driver:', req.body);
    try {
        // Ensure you are using the correct class and schema
        const driverInstance = new Driver(req.body.driver_name, req.body.driver_department, req.body.driver_license, req.body.driver_isActive);

        // Create a new Mongoose Driver instance
        const newDriver = new driverSchema({
            _id: new mongoose.Types.ObjectId(),
            driver_id: driverInstance.driver_id,
            driver_name: driverInstance.driver_name,
            driver_department: driverInstance.driver_department,
            driver_license: driverInstance.driver_license,
            driver_isActive: driverInstance.driver_isActive
        });

        // Save the new driver using Mongoose
        const savedDriver = await newDriver.save();
        console.log('Driver saved successfully:', savedDriver);

        // Redirect to the list of drivers after successful addition
        res.redirect('/30628059/Ranjit/drivers');
    } catch (error) {
        console.error('Error adding new driver:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

/* Delete drivers GET request
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
        const driverId = req.body.driver_id; 
        const deletedDriver = await driverSchema.findOneAndDelete({ driver_id: driverId });
        if (!deletedDriver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.redirect('/30628059/Ranjit/drivers'); 
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ error: 'Cannot delete driver' });
    }
});

// Update Drivers GET request
app.get('/30628059/Ranjit/drivers/update', async (req, res) => {
  try {
    const drivers = await driverSchema.find();
    res.render('updatedriver.html', { drivers });
  } catch (error) {
    res.status(500).send('Cannot get drivers data');
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
*/
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
        const driver = new Driver(driver_name, driver_department, driver_license, driver_isActive);

        // Creating a new Driver instance
        const newDriver = new driver({
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
        await driverSchema.updateMany(
            { assigned_packages: driverId },
            { $pull: { assigned_packages: driverId } }
        );

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

// RESTful API - Update license and department for driver
app.put('/30628059/Ranjit/api/v1/drivers/update', async (req, res) => {
    try {
        const { _id, driver_license, driver_department } = req.body;

        // Checks if all the required fields are completed
        if (!_id || !driver_license || !driver_department) {
            return res.status(400).json({ status: 'Missing required fields' });
        }

        // Does the update
        const result = await driverSchema.updateOne(
            { _id: _id },
            { $set: { driver_license, driver_department } }
        );

        // Check if the ID matches ID from database
        if (result.matchedCount === 0) {
            return res.status(404).json({ status: 'ID not found' });
        }
        res.json({ status: 'Driver updated successfully' });
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ error: 'Cannot update driver' });
    }
});

// RESTful API - Add a new package
app.post('/30628059/Ranjit/api/v1/packages/new', async (req, res) => {
    try {
        const { packages_title, packages_description, packages_destination, packages_weight, packages_createdAt, packages_isAllocated } = req.body;

        // To get package ID, I create a new package instance
        const packageInstance = new Package(packages_title, packages_weight, packages_destination, packages_description, packages_createdAt, packages_isAllocated);

        // Create a new Package instance
        const newPackage = new packageSchema({
            _id: new mongoose.Types.ObjectId(),
            packages_id: packageInstance.packages_id,
            packages_title,
            packages_weight,
            packages_destination,
            packages_description,
            packages_createdAt,
            packages_isAllocated
        });

        // Save the package to the database
        await newPackage.save();

        // Respond with the newly created package data
        res.status(201).json({
            id: newPackage._id,
            package_id: newPackage.packages_id
        });
    } catch (error) {
        console.error('Error adding package:', error);
        res.status(500).json({ error: 'Cannot add new package' });
    }
});

// GET request to show delete driver page
app.get('/30628059/Ranjit/drivers/api/v1/delete', async (req, res) => {
    try {
        const drivers = await driverSchema.find();
        res.render('deletedriver.html', { drivers: drivers });
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).send('Error fetching drivers');
    }
});

// POST request to delete a driver
app.post('/30628059/Ranjit/drivers//api/v1/delete', async (req, res) => {
    try {
        const driverId = req.body.driver_id;
        await driverSchema.findByIdAndDelete(driverId);
        res.redirect('/30628059/Ranjit/drivers');
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).send('Error deleting driver');
    }
});

// RESTful API - Update license and department for driver
app.put('/30628059/Ranjit/api/v1/packages/update', async (req, res) => {
    try {
        const { _id, packages_destination } = req.body;

        // Checks if all the required fields are completed
        if (!_id || !packages_destination) {
            return res.status(400).json({ status: 'Missing required fields' });
        }

        // Does the update
        const result = await packageSchema.updateOne(
            { _id: _id },
            { $set: { packages_destination: packages_destination }}
        );

        // Check if the ID matches ID from database
        if (result.matchedCount === 0) {
            return res.status(404).json({ status: 'ID not found' });
        }
        res.json({ status: 'Package updated successfully' });
    } catch (error) {
        console.error('Error updating package:', error);
        res.status(500).json({ error: 'Cannot update package' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pagenotfound.html'));
  });