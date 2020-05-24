const axios = require('axios');
const pug = require('pug');
const path = require('path');
const sgMail = require('@sendgrid/mail');
// const emailTemplate = require('../templates/baseEmail.pug');
function sendEmailTemplate({
  sendTo = '',
  sendToName = '',
  subject = '',
  content = {},
}) {
  const compiledTemplate = pug.compileFile(
    path.join(__dirname, '..', '/emailTemplates/baseEmail.pug'),
    {
      basedir: path.join(__dirname, '..', '/emailTemplates/'),
    }
  );
  const emailVerificationTemplate = compiledTemplate(content);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return sgMail.send({
    to: sendTo,
    from: 'skoda.inolog@gmail.com',
    subject: subject,
    html: emailVerificationTemplate,
  });
  // return axios.post(
  //   'https://sendgrid.com/v3/mail/send',
  //   {
  //     personalizations: [
  //       {
  //         to: [
  //           {
  //             email: sendTo,
  //             name: sendToName,
  //           },
  //         ],
  //         subject: subject,
  //       },
  //     ],
  //     from: {
  //       email: 'skoda.inolog@gmail.com',
  //       name: 'SKODA AUTO Logistika',
  //     },
  //     reply_to: {
  //       email: 'skoda.inolog@gmail.com',
  //       name: 'SKODA AUTO Logistika',
  //     },
  //     content: [
  //       {
  //         type: 'text/html',
  //         value: emailVerificationTemplate,
  //       },
  //     ],
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
  //     },
  //   }
  // );
}
exports.sendEmailTemplate = sendEmailTemplate;
