import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email is required"
        });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Wise Monke <hello@wisemonkey.site>",
            to: [email],
            subject: "Welcome to Wise Monke 🐒",
            html: `
                <h1>Welcome to Wise Monke.</h1>
                <p>Thanks for joining Wise Monke!</p>
                <p>Your first wise thought is coming soon...</p>
            `
        });

        if (error) {
            console.error(error);

            return res.status(500).json({
                error: "Failed to send email"
            });
        }

        return res.status(200).json({
            message: "Welcome to Wise Monke! Check your inbox.",
            id: data.id
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong"
        });
    }
}