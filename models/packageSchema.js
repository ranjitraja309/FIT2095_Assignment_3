// Mongoose schema for Package

const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    packages_id: {
        type: String,
        required: true,
        unique: true
    },
    packages_title: {
        type: String,
        required: true,
    },
    packages_weight: {
        type: Number,
        required: true,
    },
    packages_destination: {
        type: String,
        required: true,

    },
    packages_description: {
        type: String,
        required: true,
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