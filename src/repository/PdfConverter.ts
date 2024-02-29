import fs from "fs";
import path from "path";
import pdfPoppler from "pdf-poppler";

export class PdfConverter {
  private base64Pdf: string;
  private pdfFilePath: string;

  constructor(base64Pdf: string, pdfFilePath: string) {
    this.base64Pdf = base64Pdf.replace(/^data:application\/pdf;base64,/, "");
    this.pdfFilePath = pdfFilePath;
  }

  base64ToPdf() {
    const buffer = Buffer.from(this.base64Pdf, "base64");
    fs.writeFileSync(this.pdfFilePath, buffer);
  }

  async convertToJpeg() {
    const options = {
      format: "jpeg",
      out_dir: path.dirname("./"),
      out_prefix: path.basename(this.pdfFilePath, path.extname(this.pdfFilePath)),
      page: 1,
    };

    await pdfPoppler.convert(this.pdfFilePath, options);
    return path.join(options.out_dir, `${options.out_prefix}-1.jpg`);
  }
}
