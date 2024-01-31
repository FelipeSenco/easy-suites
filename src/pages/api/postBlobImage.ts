import type { NextApiRequest, NextApiResponse } from "next";
import { Pagamento } from "@/types/Pagamento";
import { BlobStorageService } from "@/repository/BlobStorageService";

type UploadRequestBody = {
  imageBase64: string;
  pagamento: Pagamento;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const { imageBase64, pagamento } = req.body as UploadRequestBody;
    const blobService = new BlobStorageService(process.env.AZURE_STORAGE_CONNECTION_STRING, process.env.NEXT_PUBLIC_ENVIRONMENT);

    await blobService.postBlobImage(imageBase64, pagamento);

    res.status(200).json({
      message: "File uploaded successfully",
      url: imageBase64
        ? `/api/getBlobImage?imageName=${process.env.NEXT_PUBLIC_ENVIRONMENT}/inquilino-${pagamento.InquilinoId}/pagamento-${pagamento.Id}.jpeg`
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload image", url: null });
  }
}
