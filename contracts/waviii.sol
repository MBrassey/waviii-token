pragma solidity ^0.5.0;

import "node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract waviii is ERC20Mintable {
  string  public name;
  string  public symbol;
  uint256 public decimals;

  constructor() public {
    name = "waviii Token";
    symbol = "waviii";
    decimals = 18;
  }
}
