const mailer = require('nodemailer');

module.exports = class Mailer {

  constructor(email, password) {
    this.transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });
  }

  sendMail(subject, html, to) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: 'gisfitproduction@gmail.com',
          to,
          subject,
          html
        },
        (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        }
      )
    });
  }

}
