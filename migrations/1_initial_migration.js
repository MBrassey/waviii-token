const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const erc20token = await waviii.deployed()
  // Mint 1,000 waviii Tokens for the deployer
  await erc20token.mint(
    '0x5F649414259e3E3bCC8450f6c30979551A6C637f',
    '1000000000000000000000'
  )
};