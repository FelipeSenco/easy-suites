import { Pagamento } from "@/types/Pagamento";
import { BlobServiceClient } from "@azure/storage-blob";

export class BlobStorageService {
  private client: BlobServiceClient;
  private environment: string;

  constructor(connectionString: string, environment: string) {
    this.client = BlobServiceClient.fromConnectionString(connectionString);
    this.environment = environment;
  }

  async getBlobImage(blob: string): Promise<NodeJS.ReadableStream> {
    const containerClient = this.client.getContainerClient("easysuites");
    const blobClient = containerClient.getBlobClient(blob);

    const downloadBlockBlobResponse = await blobClient.download();
    const blobReadableStream = downloadBlockBlobResponse.readableStreamBody;
    return blobReadableStream;
  }

  async postBlobImage(image64: string, pagamento: Pagamento) {
    const blobName = `${this.environment}/inquilino-${pagamento.InquilinoId}/pagamento-${pagamento.Id}.jpeg`;
    const containerClient = this.client.getContainerClient("easysuites");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    if (!image64) {
      const exists = await blockBlobClient.exists();
      if (exists) {
        await blockBlobClient.delete();
      }
      return;
    }

    const buffer = await this.base64ToBuffer(image64);

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: "image/jpeg" },
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
