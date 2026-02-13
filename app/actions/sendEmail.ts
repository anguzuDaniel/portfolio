"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Please fill in all required fields." };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact Form <onboarding@resend.dev>", // Default testing domain
            to: "anguzudaniel@gmail.com", // Replace with user's actual email or env var
            replyTo: email,
            subject: `New Message from ${name}: ${subject || "Portfolio Inquiry"}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    } catch (error) {
        return { error: "Failed to send email. Please try again later." };
    }
}
