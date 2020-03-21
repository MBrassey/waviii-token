const suite = require('../node_modules/token-test-suite/lib/suite');
require('babel-polyfill');

const waviii = artifacts.require('waviii');

contract('waviii', function (accounts) {
	let options = {
		// accounts to test with, accounts[0] being the contract owner
		accounts: accounts,

		// factory method to create new token contract
		create: async function () {
			return await waviii.new();
		},

		// factory callbacks to mint the tokens
		// use "transfer" instead of "mint" for non-mintable tokens
		mint: async function (token, to, amount) {
			return await token.transfer(to, amount, { from: accounts[0] });
		},

		// optional:
		// also test the increaseApproval/decreaseApproval methods (not part of the ERC-20 standard)
		increaseDecreaseApproval: false,

		// token info to test
		name: 'waviii Token',
		symbol: 'waviii',
		decimals: 18,

		// initial state to test
		initialSupply: 1000000,
		initialBalances: [
			[accounts[0], 1000000]
		],
		initialAllowances: [
			[accounts[0], accounts[1], 0]
		]
	};

	suite(options);
});