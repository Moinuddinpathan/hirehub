const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendApplicationReceivedEmail = async (
  email,
  name,
  jobTitle,
) => {

  console.log("Email Function Values:");
  console.log({
    email,
    name,
    jobTitle,
  });

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
    subject: "Application Received",

    html: `
      <div style="font-family:Arial;background:#f4f4f4;padding:30px;">

        <div style="background:white;padding:30px;border-radius:10px;max-width:600px;margin:auto;">

          <h1 style="color:#0d6efd;">
            Job Portal
          </h1>

          <hr>

          <h2>Hello ${name},</h2>

          <p>
            Thank you for applying for the position of
            <strong>${jobTitle}</strong>.
          </p>

          <p>
            We have successfully received your application.
          </p>

          <div style="
            background:#fff3cd;
            padding:15px;
            border-radius:8px;
            margin:20px 0;
            border-left:5px solid #ffc107;
          ">

            <strong>Status:</strong>

            Under Review 🟡

          </div>

          <p>
            Your application has been successfully received and is now
            <strong>under review</strong> by our recruitment team.
          </p>

          <p>
            We will notify you by email if there is any update regarding your application.
          </p>

          <br>

          <p>
            Thank you,<br>
            <strong>Job Portal Team</strong>
          </p>

        </div>

      </div>
    `,
  });

  if (error) {
    console.error("RESEND APPLICATION EMAIL ERROR:", error);
    throw new Error(error.message || "Failed to send application email");
  }

  console.log("APPLICATION EMAIL SENT:", data);

  return data;
};

module.exports = sendApplicationReceivedEmail;