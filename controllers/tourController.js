const fs = require('fs');
const Tour = require('./../models/tourModel');

// ROUTE HANDLERS
const getAllTours = async (req, res) => {

    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                tours
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e
        })
    }
}
const getOneTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e
        })
    }
}

const createOneTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e
        })
    }
}

const updateOneTour = (req, res) => {
    res.status(200).json({
        status: 'success',
    })
}

const deleteOneTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}

module.exports = {
    getAllTours,
    getOneTour,
    createOneTour,
    updateOneTour,
    deleteOneTour
}
