const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const token = await waviii.deployed()
  // Mint ALL waviii Tokens for Luc1d
  await token.mint(
    '0x26A24D1a08181192Bee65d4fa08b8Ac50aE65468',
    '1000000000000000000000000'
  )
};