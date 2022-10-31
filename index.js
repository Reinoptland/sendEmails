const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

console.log("SERVER:", process.env.SMTP_SERVER);

// nodemailer.createTransport({
//     host: "smtp.example.com",
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: "username",
//       pass: "password",
//     },
//   });

// console.log(
//   "CHECK",
//   process.env.SMTP_SERVER,
//   process.env.SMTP_SENDER,
//   process.env.SMTP_PASSWORD
// );

const transport = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  service: "Sendinblue",
  auth: {
    user: process.env.SMTP_SENDER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function test() {
  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
}
// test();

function sendEmail(
  emailAdress,
  subject,
  emailContent,
  succesCallback,
  errorCallback
) {
  transport.sendMail(
    {
      from: process.env.SMTP_SENDER,
      to: [emailAdress],
      subject: subject,
      html: emailContent,
    },
    (err, info) => {
      if (err) {
        errorCallback(err);
      } else {
        succesCallback(info);
      }
    }
  );
}

const email = `
<html>
    <h1 style="color: 'hotpink'">HI!!!</h1>
</html>
`;

sendEmail(
  "alinadakhno60@gmail.com",
  "Testing emails withs JS",
  email,
  (info) => {
    console.log("EMAIL HAS BEEN SENT", info);
    // send a response to the frontend (or just log for now)
  },
  (err) => {
    console.log("OH NO!", err);
    // send to the frontend .. something went wrong
  }
);
