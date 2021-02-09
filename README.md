## waviii-token

The waviii ERC-20 token is powered by a SmartContract deployed to the Ethereum Mainnet. The token was originally developed using OpenZeppelin libraries and deployed with the truffle framework. In the second release, I updated the token smartcontract to a lighter model with an integrated exchange contract deployed using the Ethereum RemixIDE. waviii-token is the official ERC-20 token used by the [waviii.io](https://github.com/MBrassey/waviii.io) dApp.

[![licensebadge](https://img.shields.io/badge/license-CC0_1.0_Universal-blue)](https://github.com/MBrassey/waviii-token/blob/main/LICENSE)

#### Issues

- [x] [Create ERC-20 Token, Test & Deploy to Ethereum Mainnet](https://github.com/MBrassey/waviii-token/issues/1)
- [x] [Documentation](https://github.com/MBrassey/waviii-token/issues/2)

#### Table of Contents

- [SmartContracts](#SmartContracts)
- [waviii v1](#waviiiv1)
- [waviii v2](#waviiiv2)
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Usage](#Usage)
- [Demo](#Demo)
- [Questions](#Questions)
- [License](#License)

> ERC-20 Token
> [<img src="./img/waviii-token.png">](https://etherscan.io/address/0x9cc6754d16b98a32ec9137df6453ba84597b9965)

#### Whitepaper

The immediate goal of the waviii Token is to be the main reference utility crypto-currency used within the waviii.io decentralized application ecosystem. The broader objective of the waviii Token for example, could be to establish itself as the crypto-currency of choice for anyone in the industry fulfilling a task with a smart contract. Over time, by adding new waviii dApps, like token staking, betting games, storage systems, social networks and automated trading, we intend to capitalize on a trend that is growing exponentially in our industry: the decentralisation of tasks around the world and the use of smart contracts to fulfil them. If this were more than my portfolio demo, we would see the waviii Token as an opportunity for anyone - even the under-banked, the underserved, or the next wave of 4 billion individuals who are getting access to the internet – to find useful incentives for their work and improve their financial condition through access to a new decentralised financial system built upon the Ethereum Network.

#### SmartContracts

For educational purposes, waviii-token was rolled out in two iterations. I deployed the [original](0xba00868912af1a409f11e9c2b5d3a9376cb3c2e2) waviii token to Ethereum Mainnet on [Apr-02-2020 02:28:26 PM +UTC](https://etherscan.io/tx/0x5cdf36d71d8ad88e79547bf3293de111a3f23c1f675767c0376a40fcd52576a0) using the Solidity Multiple files format. This original token consists of [eight OpenZeppelin Smartcontracts](https://etherscan.io/address/0xBA00868912Af1a409F11E9c2B5d3a9376Cb3C2E2#code) and has a total supply of 1,000. I used the Truffle Suite to deploy and test the contracts initially on my local machine, and then on Ethereum Mainnet ([deployment log](./waviiiv1/Etherscan.io/mainnet_deployment_log.txt)).

#### waviiiv1

> Contract 9 of 9: waviii.sol

    pragma solidity ^0.5.0;

    import "./ERC20Mintable.sol";

    contract waviii is ERC20Mintable {
        string public name;
        string public symbol;
        uint256 public decimals;
        string public standard;
        string public statement;

    constructor() public {
        name = "waviii Token";
        symbol = "waviii";
        decimals = 18;
        standard = "waviii Token v1.0";
        statement = "Be waviii.";
        }
    }

The "Be waviii." statement can be viewed on the blockchain at [dropdown number 9](https://etherscan.io/readContract?m=normal&a=0xBA00868912Af1a409F11E9c2B5d3a9376Cb3C2E2&v=0xBA00868912Af1a409F11E9c2B5d3a9376Cb3C2E2#readCollapse9).

> Contract 1 of 9: Context.sol

    pragma solidity ^0.5.0;

    import "./Context.sol";
    import "./IERC20.sol";
    import "./SafeMath.sol";

    contract ERC20 is Context, IERC20 {
        using SafeMath for uint256;

        mapping (address => uint256) private _balances;
        mapping (address => mapping (address => uint256)) private _allowances;

        uint256 private _totalSupply;

        function totalSupply() public view returns (uint256) {
            return _totalSupply;
        }

        function balanceOf(address account) public view returns (uint256) {
            return _balances[account];
        }

        function transfer(address recipient, uint256 amount) public returns (bool) {
            _transfer(_msgSender(), recipient, amount);
            return true;
        }

        function allowance(address owner, address spender) public view returns (uint256) {
            return _allowances[owner][spender];
        }

        function approve(address spender, uint256 amount) public returns (bool) {
            _approve(_msgSender(), spender, amount);
            return true;
        }

        function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
            _transfer(sender, recipient, amount);
            _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
            return true;
        }

        function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
            _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
            return true;
        }

        function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
            _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
            return true;
        }

        function _transfer(address sender, address recipient, uint256 amount) internal {
            require(sender != address(0), "ERC20: transfer from the zero address");
            require(recipient != address(0), "ERC20: transfer to the zero address");

            _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
            _balances[recipient] = _balances[recipient].add(amount);
            emit Transfer(sender, recipient, amount);
        }

        function _mint(address account, uint256 amount) internal {
            require(account != address(0), "ERC20: mint to the zero address");

            _totalSupply = _totalSupply.add(amount);
            _balances[account] = _balances[account].add(amount);
            emit Transfer(address(0), account, amount);
        }

        function _burn(address account, uint256 amount) internal {
            require(account != address(0), "ERC20: burn from the zero address");

            _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
            _totalSupply = _totalSupply.sub(amount);
            emit Transfer(account, address(0), amount);
        }

        function _approve(address owner, address spender, uint256 amount) internal {
            require(owner != address(0), "ERC20: approve from the zero address");
            require(spender != address(0), "ERC20: approve to the zero address");

            _allowances[owner][spender] = amount;
            emit Approval(owner, spender, amount);
        }

        function _burnFrom(address account, uint256 amount) internal {
            _burn(account, amount);
            _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
        }
    }

> Contract 2 of 9: ERC20.sol

    pragma solidity ^0.5.0;

    import "./Context.sol";
    import "./IERC20.sol";
    import "./SafeMath.sol";

    contract ERC20 is Context, IERC20 {
        using SafeMath for uint256;

        mapping (address => uint256) private _balances;
        mapping (address => mapping (address => uint256)) private _allowances;

        uint256 private _totalSupply;

        function totalSupply() public view returns (uint256) {
            return _totalSupply;
        }

        function balanceOf(address account) public view returns (uint256) {
            return _balances[account];
        }

        function transfer(address recipient, uint256 amount) public returns (bool) {
            _transfer(_msgSender(), recipient, amount);
            return true;
        }

        function allowance(address owner, address spender) public view returns (uint256) {
            return _allowances[owner][spender];
        }

        function approve(address spender, uint256 amount) public returns (bool) {
            _approve(_msgSender(), spender, amount);
            return true;
        }

        function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
            _transfer(sender, recipient, amount);
            _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
            return true;
        }

        function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
            _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
            return true;
        }

        function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
            _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
            return true;
        }

        function _transfer(address sender, address recipient, uint256 amount) internal {
            require(sender != address(0), "ERC20: transfer from the zero address");
            require(recipient != address(0), "ERC20: transfer to the zero address");

            _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
            _balances[recipient] = _balances[recipient].add(amount);
            emit Transfer(sender, recipient, amount);
        }

        function _mint(address account, uint256 amount) internal {
            require(account != address(0), "ERC20: mint to the zero address");

            _totalSupply = _totalSupply.add(amount);
            _balances[account] = _balances[account].add(amount);
            emit Transfer(address(0), account, amount);
        }

        function _burn(address account, uint256 amount) internal {
            require(account != address(0), "ERC20: burn from the zero address");

            _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
            _totalSupply = _totalSupply.sub(amount);
            emit Transfer(account, address(0), amount);
        }

        function _approve(address owner, address spender, uint256 amount) internal {
            require(owner != address(0), "ERC20: approve from the zero address");
            require(spender != address(0), "ERC20: approve to the zero address");

            _allowances[owner][spender] = amount;
            emit Approval(owner, spender, amount);
        }

        function _burnFrom(address account, uint256 amount) internal {
            _burn(account, amount);
            _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
        }
    }

> Contract 3 of 9: ERC20Mintable.sol

    pragma solidity ^0.5.0;

    import "./ERC20.sol";
    import "./MinterRole.sol";

    contract ERC20Mintable is ERC20, MinterRole {

        function mint(address account, uint256 amount) public onlyMinter returns (bool) {
            _mint(account, amount);
            return true;
        }
    }

> Contract 4 of 9: IERC20.sol

    pragma solidity ^0.5.0;

    interface IERC20 {

        function totalSupply() external view returns (uint256);
        function balanceOf(address account) external view returns (uint256);
        function transfer(address recipient, uint256 amount) external returns (bool);
        function allowance(address owner, address spender) external view returns (uint256);
        function approve(address spender, uint256 amount) external returns (bool);
        function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

        event Transfer(address indexed from, address indexed to, uint256 value);
        event Approval(address indexed owner, address indexed spender, uint256 value);
    }

> Contract 5 of 9: Migrations.sol

    pragma solidity >=0.4.21 <0.6.0;

    contract Migrations {
        address public owner;
        uint public last_completed_migration;

        constructor() public {
            owner = msg.sender;
        }

        modifier restricted() {
            if (msg.sender == owner) _;
        }

        function setCompleted(uint completed) public restricted {
            last_completed_migration = completed;
        }

        function upgrade(address new_address) public restricted {
            Migrations upgraded = Migrations(new_address);
            upgraded.setCompleted(last_completed_migration);
        }
    }

> Contract 6 of 9: MinterRole.sol

    pragma solidity ^0.5.0;

    import "./Context.sol";
    import "../Roles.sol";

    contract MinterRole is Context {
        using Roles for Roles.Role;

        event MinterAdded(address indexed account);
        event MinterRemoved(address indexed account);

        Roles.Role private _minters;

        constructor () internal {
            _addMinter(_msgSender());
        }

        modifier onlyMinter() {
            require(isMinter(_msgSender()), "MinterRole: caller does not have the Minter role");
            _;
        }

        function isMinter(address account) public view returns (bool) {
            return _minters.has(account);
        }

        function addMinter(address account) public onlyMinter {
            _addMinter(account);
        }

        function renounceMinter() public {
            _removeMinter(_msgSender());
        }

        function _addMinter(address account) internal {
            _minters.add(account);
            emit MinterAdded(account);
        }

        function _removeMinter(address account) internal {
            _minters.remove(account);
            emit MinterRemoved(account);
        }
    }

> Contract 7 of 9: Roles.sol

    pragma solidity ^0.5.0;

    library Roles {
        struct Role {
            mapping (address => bool) bearer;
        }

        function add(Role storage role, address account) internal {
            require(!has(role, account), "Roles: account already has role");
            role.bearer[account] = true;
        }

        function remove(Role storage role, address account) internal {
            require(has(role, account), "Roles: account does not have role");
            role.bearer[account] = false;
        }

        function has(Role storage role, address account) internal view returns (bool) {
            require(account != address(0), "Roles: account is the zero address");
            return role.bearer[account];
        }
    }

> Contract 8 of 9: SafeMath.sol

    pragma solidity ^0.5.0;

    library SafeMath {
        function add(uint256 a, uint256 b) internal pure returns (uint256) {
            uint256 c = a + b;
            require(c >= a, "SafeMath: addition overflow");

            return c;
        }

        function sub(uint256 a, uint256 b) internal pure returns (uint256) {
            return sub(a, b, "SafeMath: subtraction overflow");
        }

        function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
            require(b <= a, errorMessage);
            uint256 c = a - b;

            return c;
        }

        function mul(uint256 a, uint256 b) internal pure returns (uint256) {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) {
                return 0;
            }

            uint256 c = a * b;
            require(c / a == b, "SafeMath: multiplication overflow");

            return c;
        }

        function div(uint256 a, uint256 b) internal pure returns (uint256) {
            return div(a, b, "SafeMath: division by zero");
        }

        function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
            // Solidity only automatically asserts when dividing by 0
            require(b > 0, errorMessage);
            uint256 c = a / b;
            // assert(a == b * c + a % b); // There is no case in which this doesn't hold

            return c;
        }

        function mod(uint256 a, uint256 b) internal pure returns (uint256) {
            return mod(a, b, "SafeMath: modulo by zero");
        }

        function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
            require(b != 0, errorMessage);
            return a % b;
        }
    }

#### waviiiv2

I wrote and tested and deployed the second and [official](https://etherscan.io/address/0x9cc6754d16b98a32ec9137df6453ba84597b9965) waviii token in the Ethereum RemixIDE. The deployment date was: [Jun-19-2020 12:32:09 AM +UTC](https://etherscan.io/tx/0x2c36979dc9517c4c056572241f60037a541175d67e52964fc41c70c83fc48eb7). The new waviii token consists of only one simple SmartContract and has a total supply of one million.

> Token Source Code

    pragma solidity ^0.5.0;

    contract Token {
        string  public name = "waviii";
        string  public symbol = "waviii";
        uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
        uint8   public decimals = 18;

        event Transfer(
            address indexed _from,
            address indexed _to,
            uint256 _value
        );

        event Approval(
            address indexed _owner,
            address indexed _spender,
            uint256 _value
        );

        mapping(address => uint256) public balanceOf;
        mapping(address => mapping(address => uint256)) public allowance;

        constructor() public {
            balanceOf[msg.sender] = totalSupply;
        }

        function transfer(address _to, uint256 _value) public returns (bool success) {
            require(balanceOf[msg.sender] >= _value);
            balanceOf[msg.sender] -= _value;
            balanceOf[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        }

        function approve(address _spender, uint256 _value) public returns (bool success) {
            allowance[msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _value);
            return true;
        }

        function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][msg.sender]);
            balanceOf[_from] -= _value;
            balanceOf[_to] += _value;
            allowance[_from][msg.sender] -= _value;
            emit Transfer(_from, _to, _value);
            return true;
        }
    }

This deployment was a little different, I wanted to bring real value to the waviii token by linking it's value directly to Ether's. The [Swap](https://etherscan.io/address/0x38abf018ea2f8066813c376a197b6df0349d86c5) SmartContract was deployed on [Jun-19-2020 12:33:59 AM +UTC](https://etherscan.io/tx/0xb0f8900bf7b5874ca0c6c7f30c23897c7451c1978fdb86e493cd0fc0d5a59648), it controls the value of waviii through a hard link 1:100 with Mainnet Ether. I funded the Swap SmartContract with all the available waviii tokens so they are ready for trade at any time.

> Swap Source Code

    pragma solidity ^0.5.0;

    import "./waviii.sol";

    contract EthSwap {
        string public name = "wavSwap";
        Token public token;
        uint public rate = 100;

        event TokensPurchased(
            address account,
            address token,
            uint amount,
            uint rate
        );

        event TokensSold(
            address account,
            address token,
            uint amount,
            uint rate
        );

        constructor(Token _token) public {
            token = _token;
        }

        function buyTokens() public payable {
            // Calculate the number of tokens to buy
            uint tokenAmount = msg.value * rate;

            // Require that EthSwap has enough tokens
            require(token.balanceOf(address(this)) >= tokenAmount);

            // Transfer tokens to the user
            token.transfer(msg.sender, tokenAmount);

            // Emit an event
            emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
        }

        function sellTokens(uint _amount) public {
            // User can't sell more tokens than they have
            require(token.balanceOf(msg.sender) >= _amount);

            // Calculate the amount of Ether to redeem
            uint etherAmount = _amount / rate;

            // Require that EthSwap has enough Ether
            require(address(this).balance >= etherAmount);

            // Perform sale
            token.transferFrom(msg.sender, address(this), _amount);
            msg.sender.transfer(etherAmount);

            // Emit an event
            emit TokensSold(msg.sender, address(token), _amount, rate);
        }
    }

#### Requirements

    node
    npm
    truffle
    ganache

#### Installation

    npm i

#### Usage

    ganache-cli
    truffle migrate
    truffle test

#### Demo

> Official ERC-20 Token for waviii.io
> [<img src="./img/Token.gif">](https://github.com/MBrassey/waviii.io)

> Setup
> [<img src="./img/Setup.gif">](https://waviii-token/)

> Deploy & Test
> [<img src="./img/Test.gif">](https://waviii-token/)

#### Questions

Contact me at [matt@brassey.io](mailto:matt@brassey.io) with any questions or comments.

#### License

`waviii-token` is published under the **CC0_1.0_Universal** license.

> The Creative Commons CC0 Public Domain Dedication waives copyright interest in a work you've created and dedicates it to the world-wide public domain. Use CC0 to opt out of copyright entirely and ensure your work has the widest reach. As with the Unlicense and typical software licenses, CC0 disclaims warranties. CC0 is very similar to the Unlicense.
