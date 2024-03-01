const ejs = require('ejs')
const puppet = require('pdf-puppeteer')
const nodemailer = require('nodemailer')

exports.mailing = (data) => {


    let tempData = {
        name: data.name,
        amount: data.amount,
        not: data.not
    }

    console.log(tempData);


    ejs.renderFile('./views/home.ejs', { data: tempData }, (err, str) => {
        if (err) {
            console.log(err)
            return err;
        }
        // console.log(str)
        puppet(str, (pdf) => {
            // res.setHeader("Content-Type", "application/pdf")
            // console.log(pdf)
            // res.send(pdf)
            const mail = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'nikhilwadhwa16a@gmail.com',
                    pass: 'kimt ihfg gxcn csfr'
                }
            })

            mail.sendMail({
                from: 'TeamTrees-Nikhil',
                to: data.email,
                subject: 'Contribution Certificate',
                text: "Thank you for contributing to team trees your certificate is attached down",
                attachments: [{
                    filename: 'certificate.pdf',
                    // path: pdf,
                    content: pdf,
                    contentType: 'application/pdf'
                }]
            }, (err, info) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Mail sent to ${data.email}`)
            })

        })
    })
}