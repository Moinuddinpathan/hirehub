const { transporter } = require("./sendEmail");

const sendEmailStatus = async (
    email,
    name,
    jobTitle,
    status,
) => {

     let subject = "";
  let message = "";

  switch (status) {
    case "Reviewed":

subject = "Application Reviewed";

message = `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;background:#f4f4f4;">

<tr>

<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;">

<tr>

<td style="background:#0dcaf0;padding:25px;text-align:center;">

<h1 style="color:white;margin:0;">
Job Portal
</h1>

<p style="color:white;">
Application Status Update
</p>

</td>

</tr>

<tr>

<td style="padding:40px;">


<h2 style="color:#0dcaf0;">
Application Reviewed 🔍
</h2>

<p>
Hello <strong>${name}</strong>,
</p>

<p>
Your application for
<strong>${jobTitle}</strong>
has been reviewed successfully.
</p>

<p>
Our recruitment team is currently evaluating your profile.
You will receive another update soon.
</p>

<div style="
background:#cff4fc;
padding:15px;
border-radius:8px;
margin-top:25px;
">

<strong>Status:</strong>
Reviewed 🔍

</div>

<p style="margin-top:40px;">
Best Regards,
<br>
<strong>Job Portal Recruitment Team</strong>
</p>

</td>

</tr>

<tr>

<td style="background:#f8f9fa;padding:20px;text-align:center;color:#666;font-size:13px;">

© 2026 Job Portal. All Rights Reserved.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

break;

      case "Selected":

subject = "Congratulations! You have been Selected";

message = `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;background:#f4f4f4;">

<tr>

<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:10px;overflow:hidden;">

<tr>

<td style="background:#198754;padding:25px;text-align:center;">

<h1 style="color:white;margin:0;">
Job Portal
</h1>

<p style="color:white;">
Application Status Update
</p>

</td>

</tr>

<tr>

<td style="padding:40px;">

<h2 style="color:#198754;">
Congratulations ${name}! 🎉
</h2>

<p>
We are pleased to inform you that your application has been
<strong>Selected</strong>.
</p>

<p>

<strong>Position:</strong>

${jobTitle}

</p>

<p>
Our HR Team will contact you shortly regarding the next steps.
</p>

<div style="
background:#d1e7dd;
padding:15px;
border-radius:8px;
margin-top:25px;
">

<strong>Status:</strong>

Selected ✅

</div>

<p style="margin-top:40px;">
Congratulations once again!

<br><br>

Best Regards,

<br>

<strong>Job Portal Recruitment Team</strong>

</p>

</td>

</tr>

<tr>

<td style="background:#f8f9fa;padding:20px;text-align:center;color:#666;font-size:13px;">

© 2026 Job Portal. All Rights Reserved.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

break;
 case "Rejected":

subject = "Application Update";

message = `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;background:#f4f4f4;">

<tr>

<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:10px;overflow:hidden;">

<tr>

<td style="background:#dc3545;padding:25px;text-align:center;">

<h1 style="color:white;margin:0;">
Job Portal
</h1>

<p style="color:white;">
Application Status Update
</p>

</td>

</tr>

<tr>

<td style="padding:40px;">

<h2 style="color:#dc3545;">
Application Update
</h2>

<p>

Dear <strong>${name}</strong>,

</p>

<p>

Thank you for applying for the position of

<strong>${jobTitle}</strong>.

</p>

<p>

After careful review of your application,
we have decided to move forward with other candidates for this opportunity.

</p>

<p>

We sincerely appreciate your interest in our company and encourage you to apply for future openings.

</p>

<div style="
background:#f8d7da;
padding:15px;
border-radius:8px;
margin-top:25px;
">

<strong>Status:</strong>

Rejected ❌

</div>

<p style="margin-top:40px;">

We wish you success in your future career.

<br><br>

Best Regards,

<br>

<strong>Job Portal Recruitment Team</strong>

</p>

</td>

</tr>

<tr>

<td style="background:#f8f9fa;padding:20px;text-align:center;color:#666;font-size:13px;">

© 2026 Job Portal. All Rights Reserved.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

break;
    default:
      return;
  }

  await transporter.sendMail({
    from : `"Job Portal" <${process.env.EMAIL_USER}>`,
    to : email,
    subject,
    html : message ,
  });
};

module.exports = sendEmailStatus;