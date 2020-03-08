const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const token = await waviii.deployed()
  // Mint ALL waviii Tokens for Luc1d
  await token.mint(
    '0x7251F351D076c5DFe86BDDe10Ad83e277Fc07d95',
    '1000000000000000000000000000'
  )
};
