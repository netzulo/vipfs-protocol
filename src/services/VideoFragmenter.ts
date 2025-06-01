import { createReadStream, statSync } from 'fs'
import { Readable } from 'stream'

/**
 * VideoFragmenter: Responsible for splitting large video files into smaller chunks.
 *
 * This is useful for uploading large files in pieces, processing them incrementally,
 * or securely handling them in scenarios like encryption and storage on IPFS.
 */
export default class VideoFragmenter {
  /**
   * The size of each chunk, in bytes. Defaults to 5 MB.
   */
  private readonly chunkSize: number

  /**
   * Initializes a new VideoFragmenter instance.
   * @param chunkSize - The size of each chunk in bytes (default: 5 MB).
   */
  constructor(chunkSize: number = 5 * 1024 * 1024) {
    this.chunkSize = chunkSize
  }

  /**
   * Asynchronously generates each chunk of the given video file.
   *
   * This is an async generator that yields Buffers containing the chunk data.
   *
   * @param filePath - The absolute or relative path to the video file.
   * @returns An async generator that yields each chunk as a Buffer.
   */
  async *fragment(filePath: string): AsyncGenerator<Buffer> {
    const fileStats = statSync(filePath)
    const fileSize = fileStats.size

    let start = 0

    while (start < fileSize) {
      const end = Math.min(start + this.chunkSize - 1, fileSize - 1)
      const stream = createReadStream(filePath, { start, end })
      const chunk = await this.readStreamToBuffer(stream)
      yield chunk
      start += this.chunkSize
    }
  }

  /**
   * Converts a readable stream to a single Buffer by concatenating its data events.
   *
   * @param stream - The readable stream representing a chunk of the video.
   * @returns A promise that resolves to a Buffer containing the chunk's data.
   */
  private readStreamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []

      stream.on('data', (data) => chunks.push(data))
      stream.on('end', () => resolve(Buffer.concat(chunks)))
      stream.on('error', (err) => reject(err))
    })
  }
}
