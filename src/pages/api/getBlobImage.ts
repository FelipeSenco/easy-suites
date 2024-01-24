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
    const blobService = new BlobStorageService(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.ENVIRONMENT);
    console.log(process.env.AZURE_STORAGE_CONNECTION_STRING);
    console.log(process.env.ENVIRONMENT);

    const blobReadableStream = await blobService.getBlobImage(imageName as string);

    // Set the content type
    res.setHeader("Content-Type", "image/jpeg"); // Set appropriate content type based on your image

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
