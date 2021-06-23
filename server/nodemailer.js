const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "farkop.buy@gmail.com",
      pass: "4gd-g7z-HiA-dHu",
    },
  },
  { from: "FarkopBuy <farkop.buy@gmail.com>" }
);

const mailer = (message) => {
  transport.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email sent: ", info);
  });
};

module.exports = mailer;
