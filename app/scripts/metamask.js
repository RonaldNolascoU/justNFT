export default async function getAccounts() {
  return new Promise(async (resolve, reject) => {
    await window.ethereum.enable()
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    if (!accounts) reject()
    const account = accounts[0]
    resolve(account)
  })
}
