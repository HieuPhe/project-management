const nodemailer = require('nodemailer');
const { google } = require("googleapis");

const {
  EMAIL_USER,           
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
} = process.env;

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

let transporter;
async function getTransporter() {
  if (transporter) return transporter;

  const oAuth2Client = new google.auth.OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

  const accessTokenObj = await oAuth2Client.getAccessToken();
  const accessToken = typeof accessTokenObj === "string"
    ? accessTokenObj
    : accessTokenObj?.token;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_USER,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
      accessToken,
    },
  });

  try {
    await transporter.verify();
  } catch (e) {
    transporter = null; 
    throw e;
  }
  return transporter;
}

/**
 * Gửi email bằng Gmail OAuth2
 * @param {string} toEmail - người nhận
 * @param {string} subject - tiêu đề
 * @param {string} html - nội dung HTML
 */
async function sendMail(toEmail, subject, html) {
  const tp = await getTransporter();
  const info = await tp.sendMail({
    from: `"Hệ thống" <${EMAIL_USER}>`,
    to: toEmail,
    subject,
    html,
  });
  return info;
}

module.exports = { sendMail };