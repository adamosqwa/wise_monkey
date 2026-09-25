import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { email, website } = req.body || {};
        if (website) {
        return res.status(200).json({
        message: "Thanks for subscribing!"
    });
}

        if (typeof email !== "string") {
            return res.status(400).json({
                error: "Please enter a valid email address."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                error: "Please enter a valid email address."
            });
        }

        if (normalizedEmail.length > 254) {
            return res.status(400).json({
                error: "Email address is too long."
            });
        }

        // Check whether this contact already exists.
        const { data: existingContact } = await resend.contacts.get({
            email: normalizedEmail
        });

        // If already subscribed, don't send another welcome email.
        if (existingContact && !existingContact.unsubscribed) {
            return res.status(200).json({
                message: "You're already part of the Wise Monke tribe 🐒"
            });
        }

        // Create / re-subscribe contact.
        const { error: contactError } = await resend.contacts.create({
            email: normalizedEmail,
            unsubscribed: false
        });

        if (contactError) {
            console.error("Contact error:", contactError);

            return res.status(500).json({
                error: "Could not subscribe this email."
            });
        }

        // Add contact to the newsletter segment.
        const { error: segmentError } =
            await resend.contacts.segments.add({
                email: normalizedEmail,
                segmentId: process.env.RESEND_SEGMENT_ID
            });

        if (segmentError) {
            console.error("Segment error:", segmentError);

            return res.status(500).json({
                error: "Could not finish the subscription."
            });
        }

        // Send welcome email.
        const { error: emailError } =
            await resend.emails.send({
                from: "Wise Monke <hello@wisemonkey.site>",
                to: [normalizedEmail],
                subject: "Welcome to Wise Monke 🐒",
                html: `
                    <div style="
                        margin:0;
                        padding:40px 20px;
                        background:#15180d;
                        font-family:Arial,Helvetica,sans-serif;
                        color:#f1f1df;
                    ">
                        <div style="
                            max-width:600px;
                            margin:0 auto;
                            background:#242817;
                            border:1px solid #4b5430;
                            border-radius:18px;
                            padding:42px;
                            text-align:center;
                        ">

                            <div style="
                                font-size:64px;
                                margin-bottom:18px;
                            ">
                                🐒
                            </div>

                            <p style="
                                margin:0 0 10px;
                                color:#aeb86d;
                                font-size:13px;
                                letter-spacing:3px;
                                text-transform:uppercase;
                            ">
                                Welcome
                            </p>

                            <h1 style="
                                margin:0 0 22px;
                                font-size:34px;
                                color:#e4e7c7;
                                font-weight:600;
                            ">
                                Welcome to Wise Monke.
                            </h1>

                            <p style="
                                margin:0;
                                font-size:17px;
                                line-height:1.7;
                                color:#d4d7c6;
                            ">
                                You have joined the tribe.
                            </p>

                            <p style="
                                margin:16px 0 0;
                                font-size:17px;
                                line-height:1.7;
                                color:#d4d7c6;
                            ">
                                Every morning, one thought worth thinking
                                about will find its way into your inbox.
                            </p>

                            <div style="
                                margin:34px 0;
                                padding:24px;
                                background:#1b1e11;
                                border-left:3px solid #aeb86d;
                                text-align:left;
                            ">
                                <p style="
                                    margin:0;
                                    font-size:19px;
                                    line-height:1.6;
                                    font-style:italic;
                                    color:#e4e6d5;
                                ">
                                    "Those who ask never are lost."
                                </p>
                            </div>

                            <p style="
                                margin:0;
                                color:#aeb86d;
                                font-size:15px;
                            ">
                                Your first Wise Thought is coming soon.
                            </p>

                            <div style="
                                margin:38px 0 0;
                                padding-top:24px;
                                border-top:1px solid #3b4128;
                            ">
                                <p style="
                                    margin:0;
                                    color:#777b6a;
                                    font-size:12px;
                                ">
                                    Wise Monke 🐒
                                </p>
                            </div>

                        </div>
                    </div>
                `
            });

        if (emailError) {
            console.error("Welcome email error:", emailError);

            return res.status(500).json({
                error: "Subscription created, but the welcome email could not be sent."
            });
        }

        return res.status(200).json({
            message: "Welcome to Wise Monke! Check your inbox."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong."
        });
    }
}