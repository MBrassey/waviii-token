const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
  const tokenMock = await waviii.deployed()
  // Mint 1,000 waviii Tokens for the deployer
  await tokenMock.mint(
    '0xE7258A16361914E83d24314638818A2AbF0d668B',
    '1000000000000000000000'
  )
};
