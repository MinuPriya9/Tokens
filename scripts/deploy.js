async function main() {
    const {ethers, hre} = require("hardhat");
    const FixedToken = await ethers.getContractFactory("FixedToken")
  
    // Start deployment, returning a promise that resolves to a contract object
    const fixedToken = await FixedToken.deploy()
    await fixedToken.deployed()
    console.log("Contract deployed to address:", fixedToken.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  