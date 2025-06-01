import { createReadStream, statSync } from 'fs'
import { Readable } from 'stream'

/**
 * VideoFragmenter: Fragmenta archivos de vídeo en chunks.
 */
export default class VideoFragmenter {
  constructor(private readonly chunkSize: number = 5 * 1024 * 1024) {}

  async *fragment(filePath: string): AsyncGenerator<Buffer> {
    const stats = statSync(filePath)
    const fileSize = stats.size

    let start = 0
    while (start < fileSize) {
      const end = Math.min(start + this.chunkSize - 1, fileSize - 1)
      const stream = createReadStream(filePath, { start, end })
      const chunk = await this.readStream(stream)
      yield chunk
      start += this.chunkSize
    }
  }

  private readStream(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('end', () => resolve(Buffer.concat(chunks)))
      stream.on('error', (err) => reject(err))
    })
  }
}
