/**
 * FragmentEncryptor: Cifra y descifra fragmentos.
 * Falta: Implementar cifrado real con claves derivadas.
 */
export default class FragmentEncryptor {
  constructor(private readonly wallet: any) {}

  async encrypt(chunk: Buffer, index: number): Promise<Buffer> {
    // TODO: implementar cifrado real con clave derivada
    return chunk
  }

  async decrypt(chunk: Buffer, index: number): Promise<Buffer> {
    // TODO: implementar descifrado real con clave derivada
    return chunk
  }
}
