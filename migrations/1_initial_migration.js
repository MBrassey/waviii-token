const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const erc20token = await waviii.deployed()
  // Mint 1,000 waviii Tokens for the deployer
  await erc20token.mint(
    '0xbb7674Af90615bAa464ee452D28f34C8f2653531',
    '1000000000000000000000'
  )
};