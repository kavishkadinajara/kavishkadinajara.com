/* eslint-disable no-console */
// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

import TurnstileVerify from "@/lib/TurnstileVerify";
import getCorsHeaders from "@/lib/getCorsHeaders";

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const schema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  subject: z.string().min(3).max(50),
  message: z.string().min(3).max(500),
  token: z.string().min(3),
});

interface MailBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string;
  error: string;
}

export async function POST(req: NextRequest) {
  const headers = getCorsHeaders(
    req.headers.get("Origin") || req.headers.get("origin") || "",
  );

  try {
    const body: MailBody = await req.json();
    const { name, email, subject, message, token } = body;

    if (!name || !email || !subject || !message || !token) {
      return NextResponse.json(
        { success: false, message: "Invalid Request" },
        { status: 400, headers },
      );
    }

    try {
      schema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: message },
        { status: 400, headers },
      );
    }

    const adminMsg = {
      to: "kavishkadinajara@gmail.com",
      from: { name: name, email: "kavishkadinajara@gmail.com" },
      replyTo: email,
      subject: `${subject} Inquiry from ${name}`,
      text: message,
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <h3 style="color: #333; margin-bottom: 10px;">Message from ${email}</h3>
        <div style="background-color: #fff; padding: 15px; border-radius: 5px;">
          <h4 style="color: #333;"><b>Name:</b> ${name}</h4>
          <h4 style="color: #333;"><b>Subject:</b> ${subject}</h4>
          <p style="color: #666; margin-top: 10px;">${message}</p>
        </div>
      </div>`,
    };

    const clientMsg = {
      to: { name: name, email: email },
      from: { name: "Kavishka Dinajara", email: "kavishkadinajara@gmail.com" },
      replyTo: "kaviskadinajara2@gmail.com",
      subject: `Thank you for contacting me`,
      text: "I received your message and I will get back to you as soon as possible.",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Received</title>
          <style>
              body { font-family: Arial, sans-serif; }
              .container { background-color: #f5f5f5; padding: 20px; border-radius: 5px; }
              .message { background-color: #fff; padding: 15px; border-radius: 5px; }
              .signature { font-size: 12px; color: #666; margin-top: 10px; }
          </style>
      </head>
      <body>
          <div class="container">
              <h3>Hello ${name},</h3>
              <h3>Thank you for getting in touch!</h3>
              <div class="message">
                  <p>I wanted to let you know that I've received your message, and I appreciate your interest.</p>
                  <p>I will review your message and get back to you as soon as possible.</p>
              </div>
              <p>Best Regards,</p>
              <p>Kavishka Dinajara</p>
              <p class="signature">[Automated Message: Please do not reply to this email]</p>
          </div>
      </body>
      </html>`,
    };

    const challenge = await TurnstileVerify(token);

    if (!challenge.success) {
      return NextResponse.json(
        { success: false, message: "Captcha Failed" },
        { status: 400, headers },
      );
    }

    const [adminResponse, clientResponse] = await Promise.all([
      sgMail.send(adminMsg),
      sgMail.send(clientMsg),
    ]);

    if (adminResponse[0]?.statusCode === 202) {
      return NextResponse.json({ success: true }, { status: 200, headers });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500, headers },
    );
  }

  return NextResponse.json(
    { success: false, message: "Something went wrong" },
    { status: 500, headers },
  );
}

export async function GET(req: NextRequest) {
  const headers = getCorsHeaders(
    req.headers.get("Origin") || req.headers.get("origin") || "",
  );

  return NextResponse.json(
    { success: false, message: "Invalid Request" },
    { status: 400, headers },
  );
}

export const OPTIONS = async (req: NextRequest) => {
  const headers = getCorsHeaders(
    req.headers.get("Origin") || req.headers.get("origin") || "",
  );

  return NextResponse.json({}, { status: 200, headers });
};
