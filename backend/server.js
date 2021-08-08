//@ts-check

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const path = require('path');
const app = require(path.join(__dirname, 'app.js'));
const port = process.env.PORT || 3000;

// Binds and listens for connections on the specified port
require(path.join(__dirname, 'database.js'));
app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});
