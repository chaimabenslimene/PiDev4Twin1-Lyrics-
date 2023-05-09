const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendMail(to, subject, html) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, //testAccount.user,
        pass: process.env.PASS, // , //testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to, //'rrekikyessine@gmail.com',
      subject, //'Side Proj',
      //text: 'Hello from side project !',
      html, //'<b>some html</b>',
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview Url: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    console.log(err);
  }
}

// sendMail('rrekikyessine@gmail.com', 'Another', '<h1>Hello World</h1>')
module.exports = { sendMail };
