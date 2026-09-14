const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (email, otp) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
    subject: "Your Job Portal Verification OTP",

    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
        
        <div style="background:#2563eb; color:white; padding:20px; text-align:center;">
          <h2>Job Portal</h2>
        </div>

        <div style="padding:30px;">
          <h3>Hello,</h3>

          <p>
            Thank you for registering with <b>Job Portal</b>.
          </p>

          <p>
            Use the OTP below to verify your email address.
          </p>

          <div style="
            font-size:32px;
            font-weight:bold;
            color:#2563eb;
            text-align:center;
            letter-spacing:8px;
            margin:30px 0;
          ">
            ${otp}
          </div>

          <p>
            This OTP is valid for <b>10 minutes</b>.
          </p>

          <p>
            If you did not request this OTP, please ignore this email.
          </p>

          <hr>

          <p style="font-size:12px;color:#777;">
            © 2026 Job Portal. All rights reserved.
          </p>

        </div>

      </div>
    `,
  });

  if (error) {
    console.error("RESEND EMAIL ERROR:", error);
    throw new Error(error.message || "Failed to send email");
  }

  console.log("EMAIL SENT SUCCESSFULLY:", data);

  return data;
};

module.exports = {
  sendOtpEmail,
};