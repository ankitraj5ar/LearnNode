import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID =
  "735063852446-vf5ll3cr3tfl1544a7p1ei74ruhqueip.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04xGK0dmCa_hTCgYIARAAGAQSNwF-L9Ir0pknMWre2JhXcF0FHZbwZtdLpgoCrC7WPeP1EmNORbhlqWt15eytFz5OPoY27nC41c4";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = await oAuth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: "webprimedev@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

async function sendWelcomeMail(email, name) {
  try {
    const mailOptions = {
      from: "Task Manager <webprimedev@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Thanks for Joining Us.", // Subject line
      //   text: "Welcome testing this mail form nodemailer", // plain text body
      html: `<h1>Welcome to the app, ${name}. Let me know how you get along with the app.</h1>`,
    };

    const result = await transporter.sendMail(mailOptions, (error, result) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email Sent :", result);
      }
    });
  } catch (error) {
    return error;
  }
}

async function sendCancelationMail(email, name) {
  try {
    const mailOptions = {
      from: "Task Manager <webprimedev@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Sorry to see you go!", // Subject line
      //   text: "Welcome testing this mail form nodemailer", // plain text body
      html: `<h1>Goodbye, ${name}. I hope to see you back sometime soon.</h1>`,
    };

    const result = await transporter.sendMail(mailOptions, (error, result) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email Sent :", result);
      }
    });
  } catch (error) {
    return error;
  }
}
export { sendWelcomeMail, sendCancelationMail };
// sendWelcomeMail("ankitraj5ar@gmail.com", "Ankit Raj");
