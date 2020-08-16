const mongoose = require('mongoose');

//configurating mongo DB
mongoConfiguration = {
    useNewUrlParser: true,
    ssl: true,
    replicaSet: 'meancrud-shard-0',
    authSource: 'admin',
    retryWrites: true,
    useUnifiedTopology: true,
}

//connection string for Mongo DB
uri = "mongodb+srv://allaramo:C*qyruc0.@meancrud.lmlme.mongodb.net/meancrud?retryWrites=true&w=majority";

//trying the connection or printing error
mongoose.connect(uri, mongoConfiguration)
    .then(() => {
        console.log("Connected to Mongo database!");
    })
    .catch(err => {
        console.error("No connection to DB " + JSON.stringify(err,undefined,2), err.stack);
    });

module.exports = mongoose;