const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
    await deployer.deploy(Migrations);
    await deployer.deploy(waviii);
    const erc20token = await waviii.deployed()
        // Mint 1,000 waviii Tokens for the deployer
    await erc20token.mint(
        '0x07b4E3A9134Bc88276e6Ff9516620755144CEC79',
        '1000000000000000000000'
    )
};