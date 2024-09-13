// Mongoose schema for Package

const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    packages_title: {
        type: String,
        required: true,
        validate: {
            validator: function (title) {
                return title.length > 0;
            },
            message: 'Package title is required'
        }
    },
    packages_weight: {
        type: Number,
        required: true,
        validate: {
            validator: function (weight) {
                return weight > 0;
            },
            message: 'Package weight must be higher than 0'
        }
    },
    packages_destination: {
        type: String,
        required: true,
        validate: {
            validator: function (destination) {
                return destination.length > 0;
            },
            message: 'Package destination is required'
        }
    },
    packages_description: {
        type: String,
        required: true,
        validate: {
            validator: function (description) {
                return description.length > 0;
            },
            message: 'Package description is required'
        }
    },
    packages_createdAt: {
        type: Date,
        default: Date.now
    },
    packages_isAllocated: {
        type: Boolean,
        required: true
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
});

module.exports = mongoose.model('Package', packageSchema);