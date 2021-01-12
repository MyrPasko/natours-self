const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
})
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('[DB connection is successful]'))
    .catch((e) => console.log('[ERROR]', e));

const port = process.env.PORT || 8000;
// SERVER
app.listen(port, () => {
    console.log(`[App is running on port ${port}]`);
})
