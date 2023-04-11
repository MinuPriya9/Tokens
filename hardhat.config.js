
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: "https://polygon-mumbai.g.alchemy.com/v2/Ds0fArMHuuBrg_TtPCqjkaZ_LJhlgezl",
         accounts: ["76f2788c802d9c51887eb8c4f55dc476a379151a4d0222b6f86107023412e19b"]
      }
   },
}
