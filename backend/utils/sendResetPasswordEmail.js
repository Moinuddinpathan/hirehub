const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetPasswordEmail = async (email, otp) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
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

  if (error) {
    console.error("RESEND RESET EMAIL ERROR:", error);
    throw new Error(error.message || "Failed to send password reset email");
  }

  console.log("RESET EMAIL SENT SUCCESSFULLY:", data);

  return data;
};

module.exports = sendResetPasswordEmail;