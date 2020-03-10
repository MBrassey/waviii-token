const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const token = await waviii.deployed()
  // Mint ALL waviii Tokens for Luc1d
  await token.mint(
    '0x09386583Ad6AF00e80b6CdeEFc82071fbc4e1e1B',
    '1000000000000000000000000000'
  )
};