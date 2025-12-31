const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAdminNotification = async ({ name, email, phone, courseName }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "📢 New Course Registration",
    text: `
New registration received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Course: ${courseName}
    `,
  });
};

module.exports = sendAdminNotification;
