import 'dotenv/config';
import 'dotenv-flow/config';
import * as SparkPost from 'sparkpost';
const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const sendEmail = async (recipient: string, username: string, url: string) => {
    const response = await client.transmissions.send({
        options: {
            sandbox: true
        },
        content: {
            from: 'testing@sparkpostbox.com',
            subject: `Confirm your DraftShark account, ${username}`,
            html: `<html>
            <body>
            <p><b>Final Step...</b></p>
            <p>Confirm your email address to complete your DraftShark account.  Click the link below.</p
            <a href="${url}">
                Confirm Email
            </a>
            </body>
            </html>`
        },
        recipients: [{ address: recipient }]
    });
    console.log(response);
};
