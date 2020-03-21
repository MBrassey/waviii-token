const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const token = await waviii.deployed()
  // Mint ALL waviii Tokens for admin / Lucid
   await token.mint(
   '0x9dB16e30c7AEa07baC4CEc61aDe6DbE9854D732E',
   '1000000000000000000000000'
  )
};