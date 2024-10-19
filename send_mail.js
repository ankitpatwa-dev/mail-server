const nodemailer = require('nodemailer');

// Configure Nodemailer to use the local SMTP server
let transporter = nodemailer.createTransport({
    host: 'localhost',  // Your SMTP server
    port: 25,         // Port of your SMTP server
    secure: false       // If true, use TLS; false otherwise
});

// Send an email
async function sendTestEmail() {
    try {
        let info = await transporter.sendMail({
            from: 'ak@theankit.xyz',    // Sender address
            to: 'hello@theankit.xyz',                    // Receiver address
            subject: 'Hello from Node.js',                 // Email subject
            text: 'This is a test email from Nodemailer!', // Email plain text body
            html: '<b>This is a test email from Nodemailer!</b>' // Email HTML body
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Send the test email
sendTestEmail();

