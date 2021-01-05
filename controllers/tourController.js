const fs = require('fs');
const Tour = require('./../models/tourModel');

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'));

const checkID = (req, res, next, val) => {
    if (Number(val) > toursData.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    next();
}

const checkBody = (req, res, next) => {
    const {name, price} = req.body;

    if (!name || !price) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Data'
        })
    }

    next();
}

// ROUTE HANDLERS
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: toursData.length,
        data: {
            tours: toursData
        }
    })
}
const getOneTour = (req, res) => {
    const tour = toursData.find(({ id }) => id === Number(req.params.id));

    res.status(200).json({
        status: 'success',
        // results: toursData.length,
        data: {
            tour
        }
    })
}
const createOneTour = (req, res) => {
    const newId = toursData[toursData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    toursData.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(toursData), (err) => {
        if (!err) {
            res
                .status(201)
                .json({
                    status: 'success',
                    data: {
                        tour: newTour
                    }
                });
        }
    })
}
const updateOneTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated tour here...'
        }
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
    deleteOneTour,
    checkID,
    checkBody
}
