const axios = require('axios');
const pug = require('pug');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const { userInfo } = require('os');

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
    from: 'no-reply@inolog.cz',
    subject: subject,
    html: emailVerificationTemplate,
  });
}

exports.sendEmailTemplate = sendEmailTemplate;
