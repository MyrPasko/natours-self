const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();


// MIDDLEWARES
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    console.log('[Hello from the middleware]');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.post(`/api/v1/tours`, createOneTour);
// app.patch(`/api/v1/tours/:id`, updateOneTour);
// app.delete(`/api/v1/tours/:id`, deleteOneTour);

// ROUTES
// app
//     .route('/api/v1/tours')
//     .get(getAllTours)
//     .post(createOneTour);
//
// app
//     .route('/api/v1/tours/:id')
//     .get(getOneTour)
//     .patch(updateOneTour)
//     .delete(deleteOneTour);
//
// app
//     .route('/api/v1/users')
//     .get(getAllUsers)
//     .post(createUser);
//
// app
//     .route('/api/v1/users/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;


