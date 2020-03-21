const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const erc20token = await waviii.deployed()
  // Mint 1,000 waviii Tokens for the deployer
  await erc20token.mint(
    '0x9dB16e30c7AEa07baC4CEc61aDe6DbE9854D732E',
    '1000000000000000000000'
  )
};