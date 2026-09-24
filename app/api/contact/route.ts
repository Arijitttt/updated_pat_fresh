import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, businessName, category, pincode, details } = body;

    // Configure SMTP transport (using Gmail App Password or custom SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER || "dm.patfresh@gmail.com",
        pass: process.env.SMTP_PASS, // 16-character Google App Password
      },
    });

    const mailOptions = {
      from: `"PatFresh Inquiry Hub" <${process.env.SMTP_USER || "dm.patfresh@gmail.com"}>`,
      to: "dm.patfresh@gmail.com",
      replyTo: phone,
      subject: `🚨 New B2B Wholesale Lead: ${businessName || fullName} (${category})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #d32f2f; color: white; padding: 20px 24px;">
            <h2 style="margin: 0; font-size: 20px;">New Commercial Quotation Request</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">PatFresh Wholesale Food Supply Network</p>
          </div>
          
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Full Name:</td>
                <td style="padding: 8px 0; font-weight: bold;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Contact Number:</td>
                <td style="padding: 8px 0; font-weight: bold;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Business / Kitchen:</td>
                <td style="padding: 8px 0; font-weight: bold;">${businessName || "Not Specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Supply Category:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #d32f2f;">${category}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Delivery Pincode:</td>
                <td style="padding: 8px 0;">${pincode || "Not Specified"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-left: 4px solid #d32f2f; border-radius: 4px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: bold;">Detailed Requirements / Volume</p>
              <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${details}</p>
            </div>
          </div>
        </div>
      `,
    };

    if (process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP_PASS not provided. Form inquiry logged:", body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending inquiry email:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email notification." },
      { status: 500 }
    );
  }
}