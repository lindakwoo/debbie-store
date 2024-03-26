import nodemailer from 'nodemailer';
// agxo sfiv hdvj ypfd
// lindakwoo@gmail.com


export const sendVerificationEmail = (token, email, name) => {
	const url = process.env.NODE_ENV=='development'? 'http://localhost:3000/':`https://debbie-elye.onrender.com/`;
	const html = 
    `<html>
        <body>
            <h3>Dear ${name}</h3>
            <p>Thanks for signing up at Debbie's store!</p>
            <p>Use the link below to verify your email</p>
            <a href="${url}email-verify/${token}">Verify email</a>
        </body>
    </html>
    `;
	

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
		subject: 'Verify your email address',
		html: html,
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