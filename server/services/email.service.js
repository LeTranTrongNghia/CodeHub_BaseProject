import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});
class EmailService {
	async sendMail(toEmail, subject, content) {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: toEmail,
			subject: subject,
			html: content,
		};

		return await transporter.sendMail(mailOptions);
	}
}

const emailService = new EmailService();

export default emailService;
