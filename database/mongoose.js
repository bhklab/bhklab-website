const mongoose = require('mongoose');
const connection = connect();


function connect() {
    var options = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL, options);
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
