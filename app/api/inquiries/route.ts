// app/api/inquiries/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "GOOGLE_SHEET_WEBHOOK_URL is not configured in environment variables." },
        { status: 500 }
      );
    }

    // Forward form data to Google Apps Script Webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (result.status === "error") {
      throw new Error(result.error || "Failed to log inquiry in Google Sheet.");
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully recorded in Google Sheet",
    });
  } catch (error: any) {
    console.error("Error submitting inquiry to Google Sheets:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transmit inquiry" },
      { status: 500 }
    );
  }
}