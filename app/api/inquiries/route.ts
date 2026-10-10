import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      contactNumber,
      businessName,
      supplyCategory,
      deliveryOutlet,
      requirements,
    } = body;

    // Save directly into the project's data directory
    const targetDir = path.join(process.cwd(), "data");
    const filePath = path.join(targetDir, "patfresh_user_data.xlsx");

    // Ensure the folder exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const newRecord = {
      "Submission Date": new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      "Full Name": fullName || "",
      "Contact Number": contactNumber || "",
      "Business / Kitchen Name": businessName || "",
      "Supply Category": supplyCategory || "",
      "Delivery Outlet / Pincode": deliveryOutlet || "",
      "Detailed Requirements": requirements || "",
    };

    let workbook: XLSX.WorkBook;
    const sheetName = "Inquiries";

    if (fs.existsSync(filePath)) {
      try {
        const fileBuffer = fs.readFileSync(filePath);
        workbook = XLSX.read(fileBuffer, { type: "buffer" });

        // Retrieve existing rows or create new array
        let existingRows: any[] = [];
        if (workbook.Sheets[sheetName]) {
          existingRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        }

        existingRows.push(newRecord);

        // Convert updated array back to worksheet
        const updatedWorksheet = XLSX.utils.json_to_sheet(existingRows);
        workbook.Sheets[sheetName] = updatedWorksheet;

        if (!workbook.SheetNames.includes(sheetName)) {
          XLSX.utils.book_append_sheet(workbook, updatedWorksheet, sheetName);
        }
      } catch (readErr: any) {
        console.error("Error reading existing Excel file, creating fresh:", readErr);
        workbook = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([newRecord]);
        XLSX.utils.book_append_sheet(workbook, ws, sheetName);
      }
    } else {
      // First submission: create new workbook
      workbook = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([newRecord]);
      XLSX.utils.book_append_sheet(workbook, ws, sheetName);
    }

    // Write buffer using Node fs to avoid file system conflicts
    const outputBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    try {
      fs.writeFileSync(filePath, outputBuffer);
    } catch (writeErr: any) {
      if (writeErr.code === "EBUSY") {
        return NextResponse.json(
          {
            success: false,
            error:
              "The Excel file is currently open in another program. Please close it and retry.",
          },
          { status: 500 }
        );
      }
      throw writeErr;
    }

    return NextResponse.json(
      { success: true, message: "Inquiry logged to Excel successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Critical error in /api/inquiries:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to process inquiry.",
      },
      { status: 500 }
    );
  }
}