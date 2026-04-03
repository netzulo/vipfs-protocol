import { createHash } from 'crypto'

type StoredChunk = Buffer

const fragmentStore = new Map<string, StoredChunk>()

const toBuffer = (chunk: Uint8Array | Buffer): Buffer =>
  Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

const buildCid = (chunk: Buffer): string =>
  `mockcid-${createHash('sha256').update(chunk).digest('hex')}`

export const create = (_options?: { url?: string }) => ({
  async add(chunk: Uint8Array | Buffer) {
    const buffer = toBuffer(chunk)
    const cid = buildCid(buffer)
    fragmentStore.set(cid, buffer)

    return {
      cid: {
        toString: () => cid,
      },
    }
  },

  async *cat(cid: string): AsyncGenerator<Buffer> {
    const chunk = fragmentStore.get(cid)

    if (chunk == null) {
      throw new Error(`Mock IPFS fragment not found for CID: ${cid}`)
    }

    yield chunk
  },
})