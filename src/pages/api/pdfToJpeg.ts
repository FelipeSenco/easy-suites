import { PdfConverter } from "@/repository/PdfConverter";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import util from "util";

// Promisify fs.unlink to use it in async functions
const unlinkAsync = util.promisify(fs.unlink);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { base64Pdf } = req.body;
    const pdfFilePath = path.resolve("./tempPdfFile.pdf"); // Temporary file path

    const converter = new PdfConverter(base64Pdf, pdfFilePath);
    // Convert base64 to PDF
    converter.base64ToPdf();

    try {
      // Convert PDF to JPEG and get the JPEG file path
      const jpegFilePath = await converter.convertToJpeg();

      // Convert JPEG to base64
      const jpegBase64 = fs.readFileSync(jpegFilePath, "base64");
      const base64Data = `data:image/jpeg;base64,${jpegBase64}`;

      // Respond back with JPEG as base64
      res.status(200).json({ message: "PDF converted to JPEG successfully", jpegBase64: base64Data });

      // Cleanup: Delete both files
      await unlinkAsync(pdfFilePath);
      await unlinkAsync(jpegFilePath);
    } catch (error) {
      console.error("Error:", error);
      // Attempt to clean up if anything went wrong after files were created
      if (fs.existsSync(pdfFilePath)) await unlinkAsync(pdfFilePath);
      // Assuming you have the JPEG path or a pattern to identify it
      // if (fs.existsSync(jpegFilePath)) await unlinkAsync(jpegFilePath);

      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other request methods or return an error
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
