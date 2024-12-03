const sgMail = require('@sendgrid/mail');

const sendEmail = async (req, res) => {
    try {
        console.log("REQ.BODY", req.body);
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            from: { email: process.env.FROM_EMAIL_ADDRESS, name: "BHK Lab Website Contact Form" },
            to: process.env.TO_EMAIL_ADDRESS,
            subject: `${req.body.subject}`,
            html: `
                <div>
                    <div style="font-weight: 900; font-size: 1.2em;">
                        The following has been sent from the contact form through the BHK lab website.
                    </div>
                    <div style="margin-top: 10px;">
                        <div><strong>Name:</strong> ${req.body.fullName}</div>
                        <div><strong>Email:</strong> ${req.body.email}</div>
                        <div><strong>Message:</strong> ${req.body.message}</div>
                    </div>
                </div>`,
        };

        await sgMail.send(msg);

        return res.status(200).json({ error: "" });
    } catch (error) {
        console.error("Error sending email:", error);
        
        // Log the full error response if available
        if (error.response && error.response.body) {
            console.error(error.response.body);
        }

        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    sendEmail
};
