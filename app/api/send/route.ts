/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (name.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { success: false, message: "One or more fields exceed maximum length." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Kavishka Dinajara <hello@kavishkadinajara.com>",
      to: "hello@kavishkadinajara.com",
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#050810;color:#F0F4FF;padding:32px;border-radius:12px;border:1px solid rgba(14,165,233,0.2)">
          <h2 style="color:#0EA5E9;font-size:20px;margin-top:0">New message from kavishka.dev</h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <tr><td style="padding:8px 0;color:#8B9EC0;font-size:13px;width:80px">Name</td><td style="padding:8px 0;color:#F0F4FF">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#8B9EC0;font-size:13px">Reply-to</td><td style="padding:8px 0;color:#0EA5E9"><a href="mailto:${email}" style="color:#0EA5E9">${email}</a></td></tr>
          </table>
          <div style="background:#0D1829;border-radius:8px;padding:20px;border-left:3px solid #0EA5E9;margin-top:16px">
            <p style="margin:0;line-height:1.7;color:#C8D4F0;font-size:15px">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#8B9EC0">Sent ${new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })} (Sri Lanka)</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    console.log("📧 Contact form sent:", { name, email, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: "Message sent! I'll get back to you soon." },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}
export async function PUT() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}
export async function DELETE() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}
