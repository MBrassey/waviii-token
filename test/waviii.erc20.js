var waviii = artifacts.require("./waviii.sol");

contract('waviii', function(accounts) {
  var tokenInstance;
  var admin = '0x9dB16e30c7AEa07baC4CEc61aDe6DbE9854D732E';

  it('initializes the contract with the correct values', function() {
    return waviii.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, 'waviii Token', 'has the correct name');
      return tokenInstance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol, 'waviii', 'has the correct symbol');
      return tokenInstance.standard();
    }).then(function(standard) {
      assert.equal(standard, 'waviii Token v1.0', 'has the correct standard');
    });
  })

  it('allocates the initial supply upon deployment', function() {
    return waviii.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toString(), 1000000000000000000000, 'sets the total supply to 1,000,000');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance) {
      assert.equal(adminBalance.toString(), 1000000000000000000000, 'it allocates the initial supply to the admin account');
    });
  });

  it('transfers token ownership', function() {
    return waviii.deployed().then(function(instance) {
      tokenInstance = instance;
      // Test `require` statement first by transferring something larger than the sender's balance
      return tokenInstance.transfer.call(accounts[1], '99999999999999999999999');
    }).then(assert.fail).catch(function(error) {
      //console.log(error)
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.transfer.call(accounts[1], 250000, { from: admin });
    }).then(function(success) {
      assert.equal(success, true, 'it returns true');
      return tokenInstance.transfer(accounts[1], 250000, { from: admin });
    }).then(function(receipt) {
      console.log()
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, admin, 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
     return tokenInstance.balanceOf(admin);
    }).then(function(balance) {
      assert.equal(balance.toString(), 250000, 'adds the amount to the receiving account');
      return tokenInstance.balanceOf(admin);
    }).then(function(balance) {
      console.log(balanceOf(admin));
      assert.equal(balance.toString(), 750000, 'deducts the amount from the sending account');
    });
  });
});