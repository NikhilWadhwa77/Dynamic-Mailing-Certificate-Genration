const express = require('express')
const getData = require('./excelData/getData')
const DB = require('./db/connection')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const reader = require('xlsx')
const ejs = require('ejs')
const puppet = require('pdf-puppeteer')
const nodemailer = require('nodemailer')
// const genratePdf = require('./helpers/generatePdf')
const mailing = require('./helpers/mailing');

const app = express()

app.use(express.json());
app.set('view engine', 'ejs')

DB.connectToMongo()

app.post('/donate', (req, res) => {

    const { name, email, amount } = req.body;
    const not = amount / 100;

    const data = {
        name: name,
        not: not,
        amount: amount,
        email: email
    }

    mailing.mailing(data);

    res.send({ msg: "Ok" })
})

// app.get('/certificate', (req, res) => {
//     res.render('home')
// })


app.post('/upload', upload.single('file'), async (req, res) => {
    // Handle the uploaded file
    const file = reader.readFile('./uploads/' + req.file.filename)

    const newDataArr = await getData.getExcelData(file)

    // if (newDataArr.length) {
    //     res.send({ msg: "file upload success", data: newDataArr })
    // } else {
    //     res.send({ msg: "error", data: newDataArr })
    // }

    console.log(newDataArr)

    newDataArr.map((data) => {

        console.log(data)
        mailing.mailing(data)


        // let tempData = {
        //     name: data.name,
        //     amount: data.amount,
        //     not: data.not
        // }


        // ejs.renderFile('./views/home.ejs', { data: tempData }, (err, str) => {
        //     if (err) {
        //         return err;
        //     }
        //     puppet(str, (pdf) => {
        //         // res.setHeader("Content-Type", "application/pdf")
        //         // console.log(pdf)
        //         // res.send(pdf)
        //         const mail = nodemailer.createTransport({
        //             host: 'smtp.gmail.com',
        //             port: 587,
        //             secure: false,
        //             auth: {
        //                 user: 'nikhilwadhwa16a@gmail.com',
        //                 pass: 'kimt ihfg gxcn csfr'
        //             }
        //         })

        //         mail.sendMail({
        //             from: 'TeamTrees-Nikhil',
        //             to: data.email,
        //             subject: 'Contribution Certificate',
        //             text: "Thank you for contributing to team trees your certificate is attached down",
        //             attachments: [{
        //                 filename: 'certificate.pdf',
        //                 // path: pdf,
        //                 content: pdf,
        //                 contentType: 'application/pdf'
        //             }]
        //         }, (err, info) => {
        //             if (err) {
        //                 console.log(err);
        //                 return;
        //             }
        //             console.log(`Mail sent to ${data.email}`)
        //         })

        //     })
        // })

    })

    if (newDataArr.length) {
        res.send({ msg: "file upload success", data: newDataArr })
    } else {
        res.send({ msg: "error", data: newDataArr })
    }


});


app.listen(4000, () => {
    console.log('server started at 4000')
})