import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		// user: env.email.account,
		// pass: env.email.password,
		user: 'CodeHub',
		pass: 'fnir zquo fixk txuo',
	},
});

class EmailService {
	async sendMail(toEmail, subject, content) {
		const mailOptions = {
			// from: env.email.name,
			// to: toEmail,
			// subject: subject,
			// html: content,
			from: 'ngocuyenlepham@gmail.com',
			to: toEmail,
			subject: subject,
			html: content,
		};

		return await transporter.sendMail(mailOptions);
	}
}

const emailService = new EmailService();

export default emailService;
