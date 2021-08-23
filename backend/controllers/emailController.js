import asyncHandler from "express-async-handler";
import { transporter } from "../services/emailService.js";

const sendEmail = asyncHandler(async (req, res) => {
  const { from, to, subject, text } = req.body;
  const mailOptions = { from, to, subject, text };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500);
      throw new Error(error.message);
    } else {
      res.status(200).json({
        message: "Email sent",
      });
    }
  });
});

export { sendEmail };
