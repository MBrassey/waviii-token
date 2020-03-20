const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(waviii);
};
