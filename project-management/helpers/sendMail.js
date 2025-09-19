const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.EMAIL_USER ,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    (async () => {
        const info = await transporter.sendMail({
            from: 'phehieu271003@gmail.com',
            to: email,
            subject: subject,
            html: html, 
        });

        console.log("Message sent:", info.messageId);
    })();
    // const resend = new Resend(process.env.API_KEY);
    // resend.emails.send({
    //     from: 'phehieu271003@gmail.com',
    //     to: email,
    //     subject: subject,
    //     html: html
    // });
}