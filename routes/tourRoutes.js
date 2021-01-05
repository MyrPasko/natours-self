const express = require('express');
const {
    getAllTours,
    createOneTour,
    getOneTour,
    updateOneTour,
    deleteOneTour,
    checkID,
    checkBody
} = require('./../controllers/tourController');

const router = express.Router();

// This middleware called if there is "id" parameter in the route only.
router.param('id', checkID);

router
    .route('/')
    .get(getAllTours)
    .post(checkBody, createOneTour);

router
    .route('/:id')
    .get(getOneTour)
    .patch(updateOneTour)
    .delete(deleteOneTour);

module.exports = router;
