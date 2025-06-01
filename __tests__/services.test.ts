/**
 * @jest-environment node
 */
import {
  VideoFragmenter,
  FragmentEncryptor,
  IPFSUploader,
  IndexManager,
  EthereumWallet,
} from '../src/services'

// for VideoFragmenter tests
import { statSync } from 'fs'
import path from 'path'

describe('[services: VideoFragmenter]', () => {
  const videoPath = path.join(__dirname, '../public/sample_1280x720.mp4')

  it('[VideoFragmenter]: should be instantiable', () => {
    const fragmenter = new VideoFragmenter()
    expect(fragmenter).toBeInstanceOf(VideoFragmenter)
  })

  it('[VideoFragmenter]: should yield correct number of chunks', async () => {
    const fragmenter = new VideoFragmenter(1024 * 1024) // 1MB chunks
    const fileSize = statSync(videoPath).size
    const expectedChunks = Math.ceil(fileSize / (1024 * 1024))

    const chunks: Buffer[] = []
    for await (const chunk of fragmenter.fragment(videoPath)) {
      chunks.push(chunk)
    }

    expect(chunks.length).toBe(expectedChunks)
  })

  it('[VideoFragmenter]: each chunk should be a Buffer', async () => {
    const fragmenter = new VideoFragmenter(1024 * 1024)
    for await (const chunk of fragmenter.fragment(videoPath)) {
      expect(chunk).toBeInstanceOf(Buffer)
    }
  })

  it('[VideoFragmenter]: reassembled file should match original size', async () => {
    const fragmenter = new VideoFragmenter(1024 * 1024)
    const originalSize = statSync(videoPath).size

    const assembled: Buffer[] = []
    for await (const chunk of fragmenter.fragment(videoPath)) {
      assembled.push(chunk)
    }

    const reassembledBuffer = Buffer.concat(assembled)
    expect(reassembledBuffer.length).toBe(originalSize)
    // Optionally, you could write the buffer to a file and check its integrity
    // const reassembledPath = path.join(__dirname, '../public/reassembled.mp4')
    // const fs = require('fs')
    // fs.writeFileSync(reassembledPath, reassembledBuffer)
    // expect(fs.statSync(reassembledPath).size).toBe(originalSize)
  })
})

describe('[services: FragmentEncryptor]', () => {
  it('[FragmentEncryptor]: should be instantiable', () => {
    const encryptor = new FragmentEncryptor({}) // TODO: usar EthereumWallet real más adelante
    expect(encryptor).toBeInstanceOf(FragmentEncryptor)
  })
})

describe('[services: IPFSUploader]', () => {
  it('[IPFSUploader]: should be instantiable', () => {
    const uploader = new IPFSUploader({}) // TODO: usar ipfs-http-client real
    expect(uploader).toBeInstanceOf(IPFSUploader)
  })
})

describe('[services: IndexManager]', () => {
  it('[IndexManager]: should create an index', () => {
    const manager = new IndexManager()
    const index = manager.createIndex('videoId', [])
    expect(index).toHaveProperty('videoId', 'videoId')
    expect(index).toHaveProperty('fragments')
  })
})

describe('[services: EthereumWallet]', () => {
  it('[EthereumWallet]: should be instantiable', () => {
    const mnemonic = EthereumWallet.generateMnemonic()
    const wallet = new EthereumWallet(mnemonic)
    expect(wallet).toBeInstanceOf(EthereumWallet)
  })

  it('[EthereumWallet]: should derive unique keys for different indices', () => {
    const mnemonic = EthereumWallet.generateMnemonic()
    const wallet = new EthereumWallet(mnemonic)
    const key0 = wallet.deriveKey(0)
    const key1 = wallet.deriveKey(1)

    expect(key0).toBeInstanceOf(Buffer)
    expect(key1).toBeInstanceOf(Buffer)
    expect(key0.length).toBe(32)
    expect(key1.length).toBe(32)
    expect(key0.equals(key1)).toBe(false)
  })
})

// TODO: Add functional tests for each service
