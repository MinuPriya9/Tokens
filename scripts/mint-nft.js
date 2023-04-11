require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3("https://polygon-mumbai.g.alchemy.com/v2/Ds0fArMHuuBrg_TtPCqjkaZ_LJhlgezl")

const contract = require("../artifacts/contracts/FixedToken.sol/FixedToken.json")
const contractAddress = "0x049ebdfd01f66180b0ce24292e2dec2371dc1548"
const nftContract = new web3.eth.Contract(contract.abi, "0x049ebdfd01f66180b0ce24292e2dec2371dc1548")

async function burn(uint) {
  const nonce = await web3.eth.getTransactionCount("0x781C46d942Be56f91fE97C3E82eA0c693Fa6722C", "latest") //get latest nonce

  //the transaction
  const tx = {
    from: "0x781C46d942Be56f91fE97C3E82eA0c693Fa6722C",
    to: "0x049ebdfd01f66180b0ce24292e2dec2371dc1548",
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.burn(500).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, "76f2788c802d9c51887eb8c4f55dc476a379151a4d0222b6f86107023412e19b")
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
burn()

