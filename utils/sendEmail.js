const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD 
    }
  });


async function sendEmail(data)
{
    
    try{
        await transporter.sendMail({
            from: 'system@test.io', // sender address
            to: data.to, // list of receivers
            subject: data.subject // Subject line
            // text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
        });
    }
    catch(err)
    {
        console.log("error from sendEmail file")
        console.log(err);
    }
}

module.exports = sendEmail;