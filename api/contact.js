import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "shahmeertalib5960@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100) {
    errors.name = "Please enter your full name.";
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }
  if (subject.length < 2 || subject.length > 200) {
    errors.subject = "Please enter a subject.";
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Please enter your message.";
  }

  return { errors, values: { name, email, subject, message } };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { errors, values } = validateContact(req.body || {});

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing in this environment.");
      return res.status(500).json({ success: false, message: "Contact service is not configured." });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const submittedAt = new Date();
    const formattedDate = submittedAt.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "short",
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: values.email,
      subject: `New Portfolio Message — ${values.subject}`,
      text: [
        `You received a new message from your portfolio contact form.`,
        ``,
        `Full Name: ${values.name}`,
        `Email Address: ${values.email}`,
        `Subject: ${values.subject}`,
        ``,
        `Message:`,
        values.message,
        ``,
        `Submission Date & Time: ${formattedDate}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact endpoint error:", err);
    return res.status(500).json({ success: false });
  }
}
