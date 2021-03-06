const Tour = require('./../models/tourModel');

// ROUTE HANDLERS
const getAllTours = async (req, res) => {
    try {

        // BUILD QUERY
        // 1) Filtering
        // Exclude some params from query string
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'field'];
        excludedFields.forEach((field) => delete queryObj[field]);

        // 2) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // request queries object directly as a filter after deleting all unnecessary fields
        let query = Tour.find(JSON.parse(queryStr));

        // 3) Sorting
        if (req.query.sort) {
            const sortParams = req.query.sort.split(',').join(' ');

            query = query.sort(sortParams);
        } else {
            query = query.sort('-createdAd');
        }

        // 4) Field limiting
        if (req.query.fields) {
            const sortParams = req.query.fields.split(',').join(' ');

            query = query.select(sortParams);
        } else {
            query = query.select('-__v');
        }

        // 5) Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numTours = await Tour.countDocuments();

            if (skip > numTours) {
                throw new Error('This page does not exists');
            }
        }

        // Find by filters
        // const query = Tour.find({
        //     duration: req.query.duration,
        //     difficulty: req.query.difficulty
        // });

        // Find by Mongoose methods
        // const query = Tour.find()
        //   .where('duration')
        //   .equals(req.query.duration)
        //   .where('difficulty')
        //   .equals(req.query.difficulty);

        //EXECUTE QUERY

        let tours;

        try {
            tours = await query;
        } catch (e) {

        }

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
