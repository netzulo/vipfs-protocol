import { Mnemonic, HDNodeWallet } from 'ethers'

/**
 * EthereumWallet: Derives encryption keys from an Ethereum mnemonic phrase.
 */
export default class EthereumWallet {
  private readonly mnemonic: string
  private readonly hdNode: HDNodeWallet

  constructor(mnemonic: string) {
    this.mnemonic = mnemonic

    // Generate the BIP39 seed from the mnemonic
    const mnemonicObj = Mnemonic.fromPhrase(mnemonic)
    const seed = mnemonicObj.computeSeed()

    // Create the HDNode root from the seed
    this.hdNode = HDNodeWallet.fromSeed(seed)
  }

  /**
   * Derives a child private key based on the provided index.
   * @param index - Index for fragment-specific key derivation.
   * @returns Buffer containing the derived private key.
   */
  deriveKey(index: number): Buffer {
    const path = `m/44'/60'/0'/0/${index}`
    const childNode = this.hdNode.derivePath(path)
    return Buffer.from(childNode.privateKey.slice(2), 'hex')
  }

  /**
   * Generate a new random 12-word mnemonic.
   * @returns A 12-word mnemonic phrase.
   */
  static generateMnemonic(): string {
    return Mnemonic.fromEntropy(new Uint8Array(16)).phrase
  }
}
