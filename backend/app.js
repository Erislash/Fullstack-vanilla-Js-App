// @ts-check

const path = require('path'); // path module to handle file and directory paths
const express = require('express'); // express framework module
const morgan = require('morgan'); // HTTP request logger
const multer = require('multer'); // Used for uploading files
const cors = require('cors');

// Initialization
const app = express(); // Application object

// Middlewares
app.use(morgan('dev')); // morgan config format

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public', 'uploads'),
    filename(request, file, callback) {
        callback(
            null,
            `${new Date().getTime()}${path.extname(file.originalname)}`
        );
    },
});

app.use(multer({ storage }).single('image')); // 'image' must be the name of the field in the form

app.use(express.json()); // parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // parse incoming requests with urlencoded payloads

app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = {
    books: require(path.join(__dirname, 'routes', 'booksRoutes.js')),
};

app.use(cors());
app.use('/api', routes.books);

module.exports = app;
