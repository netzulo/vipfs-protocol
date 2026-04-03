import type { IPFSHTTPClient } from 'ipfs-http-client'

/**
 * IPFSUploader: Handles uploading and downloading of encrypted fragments to and from IPFS.
 *
 * This class uses the Kubo RPC client to interact with a Kubo node (local or remote),
 * uploading encrypted video fragments and retrieving them by their CIDs.
 */
export default class IPFSUploader {
  private readonly apiUrl: string
  private ipfsPromise?: Promise<IPFSHTTPClient>

  /**
   * Initializes a new IPFSUploader instance.
   * @param apiUrl - The URL of the IPFS API (e.g., 'http://localhost:5001').
   */
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  private async getClient(): Promise<IPFSHTTPClient> {
    if (this.ipfsPromise == null) {
      this.ipfsPromise = import('ipfs-http-client').then(({ create }) =>
        create({ url: this.apiUrl }),
      )
    }

    return await this.ipfsPromise
  }

  /**
   * Uploads a chunk (Buffer) to IPFS.
   * @param chunk - The encrypted fragment to upload.
   * @returns The CID (Content Identifier) of the uploaded fragment.
   */
  async upload(chunk: Buffer): Promise<string> {
    const ipfs = await this.getClient()
    const result = await ipfs.add(chunk)
    return result.cid.toString()
  }

  /**
   * Downloads a fragment from IPFS by its CID.
   * @param cid - The CID of the encrypted fragment.
   * @returns The Buffer containing the fragment data.
   */
  async download(cid: string): Promise<Buffer> {
    const ipfs = await this.getClient()
    const chunks: Buffer[] = []

    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks)
  }
}
