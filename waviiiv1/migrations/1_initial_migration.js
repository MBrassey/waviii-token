const Migrations = artifacts.require("Migrations");
const waviii = artifacts.require("waviii");

module.exports = async function(deployer) {
    await deployer.deploy(Migrations);
    await deployer.deploy(waviii);
    const erc20token = await waviii.deployed()
        // Mint 1,000 waviii Tokens for the deployer
    await erc20token.mint(
        '0x2Ba24e1a1adc135FC1cdbeae0C565D985aAd209B',
        '1000000000000000000000'
    )
};