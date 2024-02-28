import { Pagamento } from "@/types/Pagamento";
import { BlobServiceClient } from "@azure/storage-blob";

export class BlobStorageService {
  private client: BlobServiceClient;
  private environment: string;

  constructor(connectionString: string, environment: string) {
    this.client = BlobServiceClient.fromConnectionString(connectionString);
    this.environment = environment;
  }

  async getBlobImage(blob: string): Promise<{ blobReadableStream: NodeJS.ReadableStream; blobSize: number }> {
    const containerClient = this.client.getContainerClient("easysuites");
    const blobClient = containerClient.getBlobClient(blob);

    const downloadBlockBlobResponse = await blobClient.download();
    const blobSize = downloadBlockBlobResponse.contentLength;
    const blobReadableStream = downloadBlockBlobResponse.readableStreamBody;
    return { blobReadableStream, blobSize };
  }

  async postBlobFile(fileData: string, pagamento: Pagamento, mimeType: string, blobExtension: string) {
    const blobName = `${this.environment}/inquilino-${pagamento.InquilinoId}/pagamento-${pagamento.Id}.${blobExtension}`;
    const containerClient = this.client.getContainerClient("easysuites");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    if (!fileData) {
      const exists = await blockBlobClient.exists();
      if (exists) {
        await blockBlobClient.delete();
      }
      return;
    }

    const buffer = await this.base64ToBuffer(fileData);

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: mimeType },
    });
  }

  async base64ToBuffer(base64: string): Promise<Buffer> {
    const base64Data = base64.split(";base64,").pop();
    if (!base64Data) {
      throw new Error("Invalid base64 data");
    }
    return Buffer.from(base64Data, "base64");
  }
}
