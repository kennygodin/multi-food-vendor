import transporter from './nodemailerConfig';
import * as handlebars from 'handlebars';
import { verifyEmail } from './templates/verifyEmail';

export async function sendEmail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER as string,
    to,
    subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
}

export function compileVerifyTemplate(name: string, url: string) {
  const template = handlebars.compile(verifyEmail);
  const htmlBody = template({ name, url });

  return htmlBody;
}
