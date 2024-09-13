// Mongoose schema for Driver

const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    driver_id: {
        type: String,
        required: true,
        unique: true
    },
    driver_name: {
        type: String,
        required: true,
    },
    driver_department: {
        type: String,
        required: true,
        enum: ['food', 'furniture', 'electronic'],
        message: 'Driver department is required and should be one of the following options: food, furniture, electronic'
    },
    driver_license: {
        type: String,
        required: true,
        validate: {
            validator: function (license) {
                return license.length > 0;
            },
            message: 'Driver license is required'
        }
    },
    driver_isActive: {
        type: Boolean,
        required: true
    },
    driver_createdAt: {
        type: Date,
        default: Date.now
    },
    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
});

module.exports = mongoose.model('Driver', driverSchema);