import { create } from 'ipfs-http-client'

test('can create ipfs client', () => {
  const client = create({ url: 'http://localhost:5001' })
  expect(client).toBeDefined()
})
