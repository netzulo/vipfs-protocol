import { create as createIpfsClient, IPFSHTTPClient } from 'ipfs-http-client'

/**
 * IPFSUploader: Handles uploading and downloading of encrypted fragments to and from IPFS.
 *
 * This class uses the Kubo RPC client to interact with a Kubo node (local or remote),
 * uploading encrypted video fragments and retrieving them by their CIDs.
 */
export default class IPFSUploader {
  private readonly ipfs: IPFSHTTPClient

  /**
   * Initializes a new IPFSUploader instance.
   * @param apiUrl - The URL of the IPFS API (e.g., 'http://localhost:5001').
   */
  constructor(apiUrl: string) {
    this.ipfs = createIpfsClient({ url: apiUrl })
  }

  /**
   * Uploads a chunk (Buffer) to IPFS.
   * @param chunk - The encrypted fragment to upload.
   * @returns The CID (Content Identifier) of the uploaded fragment.
   */
  async upload(chunk: Buffer): Promise<string> {
    const result = await this.ipfs.add(chunk)
    return result.cid.toString()
  }

  /**
   * Downloads a fragment from IPFS by its CID.
   * @param cid - The CID of the encrypted fragment.
   * @returns The Buffer containing the fragment data.
   */
  async download(cid: string): Promise<Buffer> {
    const chunks: Buffer[] = []

    for await (const chunk of this.ipfs.cat(cid)) {
      chunks.push(chunk)
    }

    return Buffer.concat(chunks)
  }
}
