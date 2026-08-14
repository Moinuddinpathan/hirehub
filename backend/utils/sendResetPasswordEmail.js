const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"HireHub" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "HireHub - Password Reset OTP",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
      ">

        <h2 style="color: #1677ff;">
          HireHub
        </h2>

        <h3>
          Password Reset Request
        </h3>

        <p>
          We received a request to reset your HireHub password.
        </p>

        <p>
          Your OTP is:
        </p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #1677ff;
          padding: 15px;
          background: #f1f6ff;
          text-align: center;
          border-radius: 8px;
        ">
          ${otp}
        </div>

        <p style="color: #667085;">
          This OTP will expire in 5 minutes.
        </p>

        <p style="color: #667085;">
          If you did not request a password reset,
          you can safely ignore this email.
        </p>

        <hr />

        <p style="
          color: #98a2b3;
          font-size: 12px;
          text-align: center;
        ">
          © 2026 HireHub. All rights reserved.
        </p>

      </div>
    `,
  });
};

module.exports = sendResetPasswordEmail;