import nodemailer, { Transporter } from "nodemailer";

interface EmailOptions {
    to: string;
    subject: string;
    message: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'kushal.prajapati1007@gmail.com',
            pass: 'vjzz vbsm azdd llti',
        },
        authMethod: 'LOGIN', 
    });

    const mailOptions = {
        from: 'kushal.prajapati1007@gmail.com',
        to: options.to,
        subject: options.subject,
        html: options.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
