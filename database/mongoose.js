const mongoose = require('mongoose');
const connection = connect();

function connect() {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL);
    return mongoose.connection;
}

// closes mongoose connection
function gracefulExit () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection with DB is disconnected through app termination');
        process.exit(0);
    });
}

module.exports = {
    connect,
    connection,
    gracefulExit
};
