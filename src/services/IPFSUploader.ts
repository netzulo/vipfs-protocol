/**
 * IPFSUploader: Sube y descarga fragmentos desde IPFS.
 * Falta: Integrar ipfs-http-client real.
 */
export default class IPFSUploader {
  constructor(private readonly ipfsClient: any) {}

  async upload(chunk: Buffer): Promise<string> {
    // TODO: Implementar subida real a IPFS
    return 'fakeCID'
  }

  async download(cid: string): Promise<Buffer> {
    // TODO: Implementar descarga real desde IPFS
    return Buffer.from([])
  }
}
