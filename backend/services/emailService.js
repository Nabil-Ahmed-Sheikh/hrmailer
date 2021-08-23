import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST || "smtp.mailtrap.io",
  port: process.env.SMTPPORT || 2525,
  auth: {
    user: process.env.SMTPUSER || "caf791683f64b3",
    pass: process.env.SMTPPASS || "9c722aa28a7305",
  },
});

export { transporter };
