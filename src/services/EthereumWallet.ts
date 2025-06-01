/**
 * EthereumWallet: Deriva claves para cifrar fragmentos.
 * Falta: Integrar librería ethers para derivación real.
 */
export default class EthereumWallet {
  constructor(private readonly privateKey: string) {}

  deriveKey(index: number): Buffer {
    // TODO: usar ethers para derivar clave real
    return Buffer.from('fakeKey')
  }
}
