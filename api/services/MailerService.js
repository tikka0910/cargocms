import MailerService from 'sails-service-mailer';
console.log("=== MailerService ===", sails.config.mail.type);
module.exports = MailerService(sails.config.mail.type, sails.config.mail.config);
