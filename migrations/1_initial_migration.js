const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");
const initialSupply = '1000000000000000000000000' // 1 million tokens - use your actual initial supply here

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii, initialSupply);
};
