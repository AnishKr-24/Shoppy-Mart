const nodeMailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // Validate environment vars early
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    const err = new Error('Missing EMAIL_USER or EMAIL_PASS environment variables');
    console.error(err.message);
    throw err;
  }

  try {
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user,
        pass,
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: user,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    // Common Gmail auth failure hint
    if (error && error.response && /BadCredentials|Username and Password not accepted/i.test(error.response)) {
      console.error('Gmail authentication failed. If you use Google Account with 2FA, create an App Password and set it as EMAIL_PASS. Alternatively, configure OAuth2 or use a transactional email service (SendGrid/Mailgun). See: https://support.google.com/mail/?p=BadCredentials');
    }
    throw error;
  }
};

module.exports = sendEmail;
