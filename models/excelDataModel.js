const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    m_no: {
        type: Number
    },
    email: {
        type: String
    },
    amount: {
        type: Number
    },
    not: {
        type: Number
    }
})

module.exports = new mongoose.model("firstExcel", schema)