import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendMail = async(to, otp) => {
    try {
       
        try {
            await transporter.verify();
            console.log("Server is ready to take our messages");
        } catch (err) {
            console.error("Verification failed:", err);
        }

        await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset Your Password", 
        // text: "Hello world?",
        html: `<p>For reset your Password, your OTP : <b>${otp}</b></p>, It will expire in 5 minutes.`,
})
    } catch (error) {
        return console.log(error)
    }
}