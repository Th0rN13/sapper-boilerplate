import nodemailer from 'nodemailer';
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
} from 'helpers/config';

const host = EMAIL_HOST || 'smtp.ethereal.email';
const port = +EMAIL_PORT || 587;
let user = EMAIL_LOGIN || '';
let pass = EMAIL_PASSWORD || '';
const secure = port === 465;
const emailCredentials = Boolean(EMAIL_HOST && EMAIL_PORT && EMAIL_LOGIN && EMAIL_PASSWORD);
let transporter;

async function generateMailer () {
  if (!emailCredentials) {
    ({user, pass} = await nodemailer.createTestAccount());
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

generateMailer();

const from = `BoilerPlate Registration ${EMAIL_LOGIN}`;
const templates = {
  confirm: {
    subject: 'Confirm your registration',
    html: (link) => `<html>Go to link: <a href="${link}">${link}</a> to confirm your adress</html>`,
    text: (link) => `Go to link: ${link} to confirm your adress`,
  }
}

export async function sendMail (address, link) {
  console.log('Send Email', address, link);
  let info = await transporter.sendMail({
    from,
    to: address,
    subject: templates.confirm.subject,
    html: templates.confirm.html(link),
    text: templates.confirm.text(link),
  });
  if (!emailCredentials) console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
