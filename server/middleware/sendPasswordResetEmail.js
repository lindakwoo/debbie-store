import nodemailer from 'nodemailer';


export const sendPasswordResetEmail = (token, email, name) => {
	const url = process.env.NODE_ENV=='development'? 'http://localhost:3000/':`https://debbie-elye.onrender.com/`;
	const html = `
    <html>
        <body>
          <h3>Dear ${name}</h3>
             <p>Please click on the link below to reset your password.</p>
             <a href="${url}password-reset/${token}">Reset my password</a>
        </body>
    </html>`;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'lindakwoo@gmail.com',
			pass: 'agxo sfiv hdvj ypfd',
		},
	});

	const mailOptions = {
		from: 'lindakwoo@gmail.com',
		to: email,
		subject: "Debbie's store: Reset your password request.",
		html: html
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email sent to ${email}`);
			console.log(info.response);
		}
	});
};