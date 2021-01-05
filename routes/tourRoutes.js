const express = require('express');
const {
    getAllTours,
    createOneTour,
    getOneTour,
    updateOneTour,
    deleteOneTour,
} = require('./../controllers/tourController');

const router = express.Router();

// This middleware called if there is "id" parameter in the route only.
// router.param('id', checkID);

router
    .route('/')
    .get(getAllTours)
    .post(createOneTour);

router
    .route('/:id')
    .get(getOneTour)
    .patch(updateOneTour)
    .delete(deleteOneTour);

module.exports = router;
