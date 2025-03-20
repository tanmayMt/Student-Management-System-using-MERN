const nodemailer = require("nodemailer");
const dotenv = require("dotenv");


dotenv.config();

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: options.email, // Receiver's email
    subject: options.subject, // Email subject
    html: options.message, // HTML body content
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;