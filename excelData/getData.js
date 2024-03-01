const reader = require('xlsx')
const model = require('../models/excelDataModel')

exports.getExcelData = async (file) => {

    let data = []

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
        temp.forEach(element => {
            data.push(element)
        });
    }

    let newData = []

    for (let i = 0; i < data.length; i++) {

        const not = data[i].Amount / 100;

        // const alreadyExists = await model.findOne({ m_no: data[i].MobileNumber })

        const temp = {
            name: data[i].Name,
            m_no: data[i].MobileNumber,
            email: data[i].Email,
            amount: data[i].Amount,
            not: not
        }

        const tempData = new model(temp)
        // console.log(tempData)
        await tempData.save()
        newData.push(temp)

        // if (!alreadyExists) {
        //     const tempData = new model(temp)
        //     // console.log(tempData)
        //     await tempData.save()
        //     newData.push(temp)
        // }
        // if (alreadyExists) {
        //     const err = {
        //         err: temp.m_no + ' already exists'
        //     }
        //     newData.push(err)
        // }
    }

    return newData;
}