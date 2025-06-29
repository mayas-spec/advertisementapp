const nodemailer = require('nodemailer');
require("dotenv").config();

// setting up the email transporter using Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    },
});

// function to send email verification when user signs up
const sendVerificationMail = async(email, verificationToken) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: ` <h2>Welcome to Advert Platform!</h2>
                <p>Please click the link below to verify your email:</p>
                <a href="${process.env.CLIENT_URL}/verify/${verificationToken}">Verify Email</a>`,
        // this creates a clickable link that includes the verification token
    };
    await transporter.sendMail(mailOptions);
    // this actually sends the email
};


const sendPasswordResetMail = async(email, resetToken) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Password',
        html: `<h2>Password Reset Request</h2>
               <p>Click the link below to reset your password:</p>
               <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a>
               <p>This link expires in 1 hour.</p>
               `,
        // this creates a time-limited reset link for security
    };
    await transporter.sendMail(mailOptions);
};

const sendEmail = async (to, subject, text, html) => {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS 
          },
        });
        const mailOptions = {
          from:  process.env.EMAIL_USER,
          to,
          subject,
          text,
          html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent", info.messageId);
        return {
          success: true,
          messageId: info.messageId,
        };
      } catch (error) {
        console.log("Email failed to send", error);
        return {
          success: false,
          error: error,
        };
      }
    };


module.exports = {sendVerificationMail, sendPasswordResetMail,sendEmail}; 