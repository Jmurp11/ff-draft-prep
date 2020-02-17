import nodemailer, { SentMessageInfo } from 'nodemailer';

const confirm = (email: string, url: string) => {
    return {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: 'Confirm New User ✔',
        text: 'Thanks for registering for DraftShark! Please click the link to confirm your new account',
        html: `<a href="${url}">${url}</a>`
    };
}

const forgotPassword = (email: string, url: string) => {
    return {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: 'Reset DraftShark Password',
        text: 'Please click the link to reset your DraftShark password',
        html: `<a href="${url}">${url}</a>`
    };
}

export const sendEmail = async (email: string, url: string, type: string) => {
    let info: SentMessageInfo = {
        messageId: ''
    };
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    if (type === 'Confirm') {
        info = await transporter.sendMail(confirm(email, url));
    } else if (type === 'Forgot Password') {
        info = await transporter.sendMail(forgotPassword(email, url));
    } else {
        throw Error('Please provide type');
    }

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}