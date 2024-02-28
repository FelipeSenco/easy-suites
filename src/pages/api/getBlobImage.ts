import { BlobStorageService } from "@/repository/BlobStorageService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  // Retrieve the image name from the query string
  const { imageName } = req.query;

  if (!imageName) {
    res.status(400).send("Image name is required");
    return;
  }

  try {
    const blobService = new BlobStorageService(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.NEXT_PUBLIC_ENVIRONMENT);

    const { blobReadableStream, blobSize } = await blobService.getBlobImage(imageName as string);

    const split = (imageName as string).split(".");
    const fileExtension = split[split.length - 1];
    const mimeType = fileExtension === "pdf" ? "application/pdf" : fileExtension === "jpeg" ? "image/jpeg" : "image/png";
    // Set the content type
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", blobSize.toString());
    res.removeHeader("Content-Encoding");

    // Stream the blob to the response
    if (blobReadableStream) {
      blobReadableStream.pipe(res);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
