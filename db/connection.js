const mongoose = require('mongoose')

exports.connectToMongo = () => {

    const url = "mongodb+srv://nikhil0951:w1dhw1nikhil1257@cluster0.dkuaae0.mongodb.net/excelData?retryWrites=true&w=majority"

    mongoose.connect(url).then(() => {
        console.log("Connected to data base")
    }).catch((err) => {
        console.log(err);
        console.log("failed to connect")
    })
}