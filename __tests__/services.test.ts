/**
 * @jest-environment node
 */
import { statSync, writeFileSync, unlinkSync } from 'fs'
import * as path from 'path'
import {
  VideoFragmenter,
  FragmentEncryptor,
  IPFSUploader,
  IndexManager,
  EthereumWallet,
} from '../src/services'
import { FragmentMeta, IndexJson } from '../src/services/IndexManager'

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
  const mnemonic = EthereumWallet.generateMnemonic()
  const wallet = new EthereumWallet(mnemonic)

  it('[FragmentEncryptor]: should be instantiable', () => {
    const encryptor = new FragmentEncryptor(wallet)
    expect(encryptor).toBeInstanceOf(FragmentEncryptor)
  })

  it('[FragmentEncryptor]: should encrypt and decrypt data correctly', async () => {
    const encryptor = new FragmentEncryptor(wallet)
    const originalData = Buffer.from('Hello, this is a test fragment!')
    const index = 0

    // Encrypt the data
    const encryptedData = await encryptor.encrypt(originalData, index)
    expect(encryptedData).toBeInstanceOf(Buffer)
    expect(encryptedData.length).toBeGreaterThan(originalData.length)

    // Decrypt the data
    const decryptedData = await encryptor.decrypt(encryptedData, index)
    expect(decryptedData.equals(originalData)).toBe(true)
  })

  it('[FragmentEncryptor]: different indices should produce different encrypted outputs', async () => {
    const encryptor = new FragmentEncryptor(wallet)
    const originalData = Buffer.from(
      'Same fragment data, but different indices.',
    )

    const encryptedIndex0 = await encryptor.encrypt(originalData, 0)
    const encryptedIndex1 = await encryptor.encrypt(originalData, 1)

    expect(encryptedIndex0.equals(encryptedIndex1)).toBe(false)
  })
})

describe('[services: IPFSUploader]', () => {
  // Replace with your actual Kubo API URL if different
  const uploader = new IPFSUploader('http://localhost:5001/api/v0')

  it('[IPFSUploader]: should be instantiable', () => {
    expect(uploader).toBeInstanceOf(IPFSUploader)
  })

  it('[IPFSUploader]: should upload and return a valid CID', async () => {
    const data = Buffer.from('This is a test fragment for IPFS upload.')
    const cid = await uploader.upload(data)

    expect(typeof cid).toBe('string')
    expect(cid.length).toBeGreaterThan(0)
  })

  it('[IPFSUploader]: should upload and download data without corruption', async () => {
    const data = Buffer.from('This is a test fragment for IPFS round-trip.')
    const cid = await uploader.upload(data)

    const downloaded = await uploader.download(cid)
    expect(downloaded.equals(data)).toBe(true)
  })

  it('[IPFSUploader]: different data should produce different CIDs', async () => {
    const data1 = Buffer.from('First fragment data')
    const data2 = Buffer.from('Second fragment data')

    const cid1 = await uploader.upload(data1)
    const cid2 = await uploader.upload(data2)

    expect(cid1).not.toBe(cid2)
  })
})

describe('[services: IndexManager]', () => {
  const indexManager = new IndexManager()
  const videoId = 'video-123'
  const fragments: FragmentMeta[] = [
    { index: 0, cid: 'cid-0', timestamp: Date.now(), status: 'ok' },
    { index: 1, cid: 'cid-1', timestamp: Date.now(), status: 'retry' },
    { index: 2, cid: 'cid-2', timestamp: Date.now(), status: 'ok' },
  ]

  it('should create a valid index', () => {
    const index = indexManager.createIndex(videoId, fragments)
    expect(index.videoId).toBe(videoId)
    expect(index.fragments).toHaveLength(3)
    expect(index.createdAt).toBeGreaterThan(0)
  })

  it('should update fragment status correctly', () => {
    const originalIndex = indexManager.createIndex(videoId, fragments)
    const updatedIndex = indexManager.updateFragmentStatus(
      originalIndex,
      1,
      'failed',
    )
    const target = updatedIndex.fragments.find((f) => f.index === 1)
    expect(target?.status).toBe('failed')
  })

  it('should persist and load the index from a file', () => {
    const indexPath = './test-index.json'
    const index = indexManager.createIndex(videoId, fragments)
    indexManager.saveToFile(indexPath, index)

    const loaded = indexManager.loadFromFile(indexPath)
    expect(loaded.videoId).toBe(videoId)
    expect(loaded.fragments).toHaveLength(3)

    unlinkSync(indexPath)
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
