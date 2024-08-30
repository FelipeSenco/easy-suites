import type { NextApiRequest, NextApiResponse } from "next";
import { Payment } from "@/types/Payment";
import { BlobStorageService } from "@/repository/BlobStorageService";

type UploadRequestBody = {
  imageBase64: string;
  payment: Payment;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const { imageBase64, payment } = req.body as UploadRequestBody;
    const blobService = new BlobStorageService(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.NEXT_PUBLIC_ENVIRONMENT);
    const mimeType = imageBase64?.substring(5, imageBase64.indexOf(";"));
    const blobExtension = !!mimeType ? mimeType.split("/")[1] : "";

    await blobService.postBlobFile(imageBase64, payment, mimeType, blobExtension);

    res.status(200).json({
      message: "File uploaded successfully",
      url: imageBase64
        ? `/api/getBlobImage?imageName=${process.env.NEXT_PUBLIC_ENVIRONMENT}/inquilino-${payment.InquilinoId}/pagamento-${payment.Id}.${blobExtension}`
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload image", url: null });
  }
}
