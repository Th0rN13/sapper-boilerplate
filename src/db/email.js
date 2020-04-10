import nodemailer from 'nodemailer';

let transporter;

async function generateMailer () {
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

generateMailer();

export async function sendMail (address, link) {
  console.log('Send Email', address, link);
  let info = await transporter.sendMail({
    from: 'BoilerPlate Registration <some@mail.com>',
    to: address,
    subject: 'Confirm your registration',
    html: `<a href="${link}">Confirm email</a>`,
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// export function send2 (address, template, details) {
//   switch (template)  {
//     case 'reset-pass':
//       console.log('Reset password email');
//       console.log('Address:', address);
//       console.log('Details:', JSON.stringify(details));
//       break;
//     case 'confirm-email':
//       console.log('Confirm address email');
//       console.log('Address:', address);
//       console.log('Details:', JSON.stringify(details));
//       break;
//     default:
//       console.log('Default email');
//       console.log('Address:', address);
//       console.log('Details:', JSON.stringify(details));
//       break;
//   }
// }
