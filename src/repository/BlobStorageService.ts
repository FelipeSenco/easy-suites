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
    const blobClient = containerClient.getBlobClient(`${this.environment}/${blob}`);

    const downloadBlockBlobResponse = await blobClient.download();
    const blobReadableStream = downloadBlockBlobResponse.readableStreamBody;
    return blobReadableStream;
  }
}
