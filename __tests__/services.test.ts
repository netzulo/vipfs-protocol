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

describe('[services: VideoFragmenter]', () => {
  it('[VideoFragmenter]: should be instantiable', () => {
    const fragmenter = new VideoFragmenter()
    expect(fragmenter).toBeInstanceOf(VideoFragmenter)
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
    const wallet = new EthereumWallet('0xPRIVATE_KEY')
    expect(wallet).toBeInstanceOf(EthereumWallet)
  })
})

// TODO: Add functional tests for each service
