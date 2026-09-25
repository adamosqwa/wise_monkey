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
        // Add subscriber to Resend Contacts
        const { error: contactError } = await resend.contacts.create({
            email: email,
            unsubscribed: false
        });

        if (contactError) {
            console.error("Contact error:", contactError);

            return res.status(500).json({
                error: "Could not subscribe this email"
            });
        }

        // Send welcome email
        const { data, error } = await resend.emails.send({
            from: "Wise Monke <hello@wisemonkey.site>",
            to: [email],
            subject: "Welcome to Wise Monke 🐒",
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
                            font-size: 64px;
                            margin-bottom: 20px;
                        ">
                            🐒
                        </div>

                        <h1 style="
                            margin: 0 0 20px;
                            font-size: 32px;
                            color: #d9df9a;
                        ">
                            Welcome to Wise Monke.
                        </h1>

                        <p style="
                            font-size: 17px;
                            line-height: 1.7;
                            color: #d5d7c7;
                        ">
                            You have joined the tribe.
                        </p>

                        <p style="
                            font-size: 17px;
                            line-height: 1.7;
                            color: #d5d7c7;
                        ">
                            Every morning, Wise Monke will send
                            one thought worth thinking about.
                        </p>

                        <div style="
                            margin: 30px 0;
                            padding: 20px;
                            border-left: 3px solid #aeb86d;
                            background: #1b1e11;
                            text-align: left;
                        ">
                            <p style="
                                margin: 0;
                                font-size: 18px;
                                font-style: italic;
                                line-height: 1.6;
                                color: #e4e6d5;
                            ">
                                "Those who ask never are lost."
                            </p>
                        </div>

                        <p style="
                            margin-top: 30px;
                            font-size: 14px;
                            color: #9b9f8b;
                        ">
                            Your first Wise Thought will arrive soon.
                        </p>

                        <p style="
                            margin-top: 40px;
                            font-size: 13px;
                            color: #777b6a;
                        ">
                            Wise Monke 🐒
                        </p>

                    </div>
                </div>
            `
        });

        if (error) {
            console.error("Email error:", error);

            return res.status(500).json({
                error: "Subscription created, but welcome email failed"
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