import { Resend } from "resend";
import { thoughts } from "../thoughts.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    // Protect the endpoint from random people calling it.
    const authHeader = req.headers.authorization;

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    try {
        // Get all contacts
        const { data, error } = await resend.contacts.list();

        if (error) {
            console.error("Contacts error:", error);

            return res.status(500).json({
                error: "Could not load subscribers"
            });
        }

        const subscribers = data.data.filter(
            contact => !contact.unsubscribed
        );

        if (subscribers.length === 0) {
            return res.status(200).json({
                message: "No active subscribers."
            });
        }

        // Pick random thought
        const thought =
            thoughts[Math.floor(Math.random() * thoughts.length)];

        // Prepare emails
        const emails = subscribers.map(contact => ({
            from: "Wise Monke <hello@wisemonkey.site>",
            to: [contact.email],
            subject: "🐒 Your Wise Thought for Today",
            html: `
                <div style="
                    margin: 0;
                    padding: 40px 20px;
                    background: #15180d;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #f1f1df;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                        background: #242817;
                        border: 1px solid #4b5430;
                        border-radius: 16px;
                        padding: 40px;
                        text-align: center;
                    ">

                        <div style="
                            font-size: 52px;
                            margin-bottom: 20px;
                        ">
                            🐒
                        </div>

                        <p style="
                            margin: 0 0 10px;
                            color: #aeb86d;
                            font-size: 13px;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                        ">
                            Today's Wise Thought
                        </p>

                        <h1 style="
                            font-size: 28px;
                            line-height: 1.4;
                            color: #e5e8c8;
                            font-weight: normal;
                        ">
                            ${thought}
                        </h1>

                        <div style="
                            width: 60px;
                            height: 2px;
                            background: #aeb86d;
                            margin: 30px auto;
                        "></div>

                        <p style="
                            margin: 0;
                            color: #8f947d;
                            font-size: 14px;
                        ">
                            Think about it.
                        </p>

                        <p style="
                            margin-top: 35px;
                            color: #686c5b;
                            font-size: 12px;
                        ">
                            Wise Monke 🐒
                        </p>

                    </div>
                </div>
            `
        }));

        const { data: result, error: sendError } =
            await resend.batch.send(emails);

        if (sendError) {
            console.error("Batch error:", sendError);

            return res.status(500).json({
                error: "Could not send daily thoughts"
            });
        }

        return res.status(200).json({
            message: "Daily thoughts sent.",
            thought: thought,
            recipients: subscribers.length,
            result: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong"
        });
    }
}