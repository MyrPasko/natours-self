const Tour = require('./../models/tourModel');

// ROUTE HANDLERS
const getAllTours = async (req, res) => {
    try {
        console.log('[Query: ]', req.query);

        // Exclude some params from query string
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'field'];
        excludedFields.forEach((field) => delete queryObj[field]);

        // request queries object directly as a filter after deleting all unnecessary fields
        const tours = await Tour.find(queryObj);

        // Find by filters
        // const tours = await Tour.find({
        //     duration: req.query.duration,
        //     difficulty: req.query.difficulty
        // });

        // Find by Mongoose methods
        // const tours = await Tour.find()
        //   .where('duration')
        //   .equals(req.query.duration)
        //   .where('difficulty')
        //   .equals(req.query.difficulty);

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: tours.length,
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

const updateOneTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e
        })
    }
}

const deleteOneTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e
        })
    }
}

module.exports = {
    getAllTours,
    getOneTour,
    createOneTour,
    updateOneTour,
    deleteOneTour
}
