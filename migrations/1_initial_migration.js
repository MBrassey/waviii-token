const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const token = await waviii.deployed()
  // Mint ALL waviii Tokens for admin / Lucid
  await token.mint(
    '0x820dF1087EbB9bb1510445bB86C732707a290BD5',
    '1000000000000000000000000'
  )
};