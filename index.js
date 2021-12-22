const EthereumTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const url = 'http://localhost:7545'

const web3 = new Web3(url)
const pbact0 ='0x377A5A7E728F8d9A5090356db421e3f3E5E6d00f'
const pbact1 ='0x7965304017930ED4ABd54f1acC3D7962B3d8a3Fa'
const pvtkey = '8dee3e2b9a9243b5317fcb398e2f835c17d9c34c0d22e793dc0269c34cc179e0'
const pvtkeyhex = new Buffer.from(pvtkey, 'hex')
//const common = new Common({ chain: Chain.Mainnet })

function getAccounts() {
	web3.eth.getAccounts().then(console.log)
}

function getBalance(acct) {
	web3.eth.getBalance(acct, (err, result) => console.log(`Account ${acct} is ${result}`))
}

function transfer(toacct, gasprice, gaslimit, value) {
	const tx = new EthereumTx({
		nonce: 1,
		to: toacct,
		gasPrice: gaslimit,
		gasLimit: gaslimit,
		value: value,
		data: "0x0"
	})
	tx.sign(pvtkeyhex)
	const serializedTx = tx.serialize()
	console.log(serializedTx)
	web3.eth.sendSignedTransaction(serializedTx)
}


getAccounts()
getBalance(pbact0)
getBalance(pbact1)
transfer(pbact0, 20000000, 30000, 10000)
getBalance(pbact0)
getBalance(pbact1)
