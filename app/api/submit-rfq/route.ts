// app/api/submit-rfq/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Google Sheet webhook URL is not configured" },
        { status: 500 }
      );
    }

    // Forward the payload directly to Google Sheets
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (result.status === "error") {
      throw new Error(result.error);
    }

    return NextResponse.json({ success: true, message: "Recorded to Google Sheet" });
  } catch (error: any) {
    console.error("Sheet submit error:", error);
    return NextResponse.json(
      { error: "Failed to record inquiry", details: error.message },
      { status: 500 }
    );
  }
}