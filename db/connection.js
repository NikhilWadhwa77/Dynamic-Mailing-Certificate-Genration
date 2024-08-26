const mongoose = require('mongoose')

exports.connectToMongo = () => {

    const url = "<your mongoDB key>"

    mongoose.connect(url).then(() => {
        console.log("Connected to data base")
    }).catch((err) => {
        console.log(err);
        console.log("failed to connect")
    })
}
