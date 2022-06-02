require("dotenv").config();
import { createTransport } from "nodemailer";

const sendEmail = async (emailData) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = createTransport({
    service: "yahoo",
    //host: "smtp.mailtrap.io",
    //port: 2525,
    secure: false,
    //requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // send mail with defined transport object

  const info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: emailData.to, // list of receivers
    subject: emailData.subject, // Subject line
    text: emailData.text, // plain text body
    html: emailData.html,
  });
  return info;
};

export default { sendEmail };
