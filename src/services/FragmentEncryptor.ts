import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import EthereumWallet from './EthereumWallet'

/**
 * FragmentEncryptor: Handles the encryption and decryption of individual video chunks.
 *
 * This class uses AES-256-GCM symmetric encryption. The key is derived from
 * the EthereumWallet for each chunk based on its index, ensuring that each
 * fragment uses a unique and secure key.
 */
export default class FragmentEncryptor {
  /**
   * AES encryption algorithm to use.
   */
  private static readonly algorithm = 'aes-256-gcm'

  /**
   * Size of the initialization vector (IV) in bytes.
   */
  private static readonly ivSize = 12 // 96 bits, recommended for GCM

  constructor(private readonly wallet: EthereumWallet) {}

  /**
   * Encrypts a chunk of data using a unique key derived from the wallet and index.
   *
   * @param chunk - The data to encrypt.
   * @param index - The index of the chunk, used for key derivation.
   * @returns The encrypted data, with IV and authentication tag concatenated.
   */
  async encrypt(chunk: Buffer, index: number): Promise<Buffer> {
    const key = this.wallet.deriveKey(index)
    const iv = randomBytes(FragmentEncryptor.ivSize)

    const cipher = createCipheriv(FragmentEncryptor.algorithm, key, iv)
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()])
    const authTag = cipher.getAuthTag()

    // Concatenate IV + encrypted data + auth tag
    return Buffer.concat([iv, encrypted, authTag])
  }

  /**
   * Decrypts an encrypted chunk using the corresponding derived key.
   *
   * @param encryptedData - The encrypted chunk (IV + encrypted data + auth tag).
   * @param index - The index of the chunk, used for key derivation.
   * @returns The decrypted data as a Buffer.
   */
  async decrypt(encryptedData: Buffer, index: number): Promise<Buffer> {
    const key = this.wallet.deriveKey(index)
    const iv = encryptedData.slice(0, FragmentEncryptor.ivSize)
    const authTag = encryptedData.slice(-16) // AES-GCM auth tag size
    const encrypted = encryptedData.slice(FragmentEncryptor.ivSize, -16)

    const decipher = createDecipheriv(FragmentEncryptor.algorithm, key, iv)
    decipher.setAuthTag(authTag)

    return Buffer.concat([decipher.update(encrypted), decipher.final()])
  }
}
