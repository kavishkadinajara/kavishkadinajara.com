/* eslint-disable no-console */
// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextRequest, NextResponse } from "next/server";
// Uncomment the line below if you want to use Resend
// import { Resend } from 'resend';

// Initialize Resend (uncomment if using)
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields (name, email, subject, message) are required",
        },
        { status: 400 },
      );
    }

    // Validate field lengths
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields exceed maximum length",
        },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // Log the contact attempt
    console.log("📧 New contact form submission:", {
      name: name.substring(0, 50),
      email,
      subject: subject.substring(0, 100),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent")?.substring(0, 100),
    });

    // Example with Resend (uncomment if you have Resend set up)
    /*
        try {
          const emailResult = await resend.emails.send({
            from: 'portfolio@yourdomain.com', // Must be verified domain
            to: 'kavishkadinajara@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0891b2;">New Contact Form Submission</h2>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <h3 style="color: #374151; margin-top: 0;">Message:</h3>
                  <p style="line-height: 1.6; color: #4b5563;">${message.replace(
                    /\n/g,
                    "<br>",
                  )}</p>
                </div>
                <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
                  Sent from your portfolio contact form at ${new Date().toLocaleString()}
                </p>
              </div>
            `,
          });
    
          if (emailResult.error) {
            throw new Error(emailResult.error.message);
          }
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          return NextResponse.json(
            {
              success: false,
              message: 'Failed to send email. Please try again later or contact directly.'
            },
            { status: 500 }
          );
        }
        */

    // Simulate successful email sending
    // Replace this with actual email service integration
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Contact form API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: "This endpoint only accepts POST requests" },
    { status: 405 },
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 },
  );
}
