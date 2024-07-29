// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   private transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail', // Example: Gmail, but you can use other services
//       auth: {
//         user: 'shikha.sharma80777gmail.com', // Your email address
//         pass: 'your-email-password',   // Your email password
//       },
//     });
//   }

//   async sendMail(to: string, subject: string, text: string): Promise<void> {
//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to,
//       subject,
//       text,
//     };

//     await this.transporter.sendMail(mailOptions);
//   }
// }

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '87cdb66e5f1d8d', 
        pass: 'ac7ea3ec10b9a9', 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'shikha.sharma80777gmail.com', // Replace with your "from" email address
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send email');
    }
  }
}
