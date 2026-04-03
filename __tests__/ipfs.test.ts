test('can create ipfs client', async () => {
  const { create } = await import('ipfs-http-client')
  const client = create({ url: 'http://localhost:5001' })
  expect(client).toBeDefined()
})
