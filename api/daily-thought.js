import { Resend } from "resend";
import { thoughts } from "../thoughts.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const authHeader = req.headers.authorization;

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    try {
        const thought =
            thoughts[Math.floor(Math.random() * thoughts.length)];

        const { data, error } =
            await resend.broadcasts.create({
                segmentId: process.env.RESEND_SEGMENT_ID,

                from: "Wise Monke <hello@wisemonkey.site>",

                subject: "🐒 Your Wise Thought for Today",

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
                                font-size:58px;
                                margin-bottom:20px;
                            ">
                                🐒
                            </div>

                            <p style="
                                margin:0 0 16px;
                                color:#aeb86d;
                                font-size:13px;
                                letter-spacing:3px;
                                text-transform:uppercase;
                            ">
                                Today's Wise Thought
                            </p>

                            <h1 style="
                                margin:0;
                                font-size:29px;
                                line-height:1.5;
                                font-weight:normal;
                                color:#e5e8c8;
                            ">
                                ${thought}
                            </h1>

                            <div style="
                                width:60px;
                                height:2px;
                                background:#aeb86d;
                                margin:32px auto;
                            "></div>

                            <p style="
                                margin:0;
                                color:#92977f;
                                font-size:14px;
                            ">
                                Think about it.
                            </p>

                            <div style="
                                margin-top:40px;
                                padding-top:24px;
                                border-top:1px solid #3b4128;
                            ">
                                <p style="
                                    margin:0 0 12px;
                                    color:#686c5b;
                                    font-size:12px;
                                ">
                                    Wise Monke 🐒
                                </p>

                                <p style="
                                    margin:0;
                                    font-size:12px;
                                ">
                                    <a
                                        href="{{{RESEND_UNSUBSCRIBE_URL}}}"
                                        style="
                                            color:#8f947d;
                                            text-decoration:underline;
                                        "
                                    >
                                        Unsubscribe
                                    </a>
                                </p>
                            </div>

                        </div>
                    </div>
                `,

                send: true
            });

        if (error) {
            console.error("Broadcast error:", error);

            return res.status(500).json({
                error: "Could not send today's Wise Thought."
            });
        }

        return res.status(200).json({
            message: "Wise Thought sent.",
            thought,
            broadcastId: data.id
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong."
        });
    }
}