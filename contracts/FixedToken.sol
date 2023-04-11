//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FixedToken is ERC20, Ownable {
    uint256 public TOTAL_SUPPLY = 1000 * 10 ** decimals();

    constructor() ERC20("Fixed Token", "FT") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
    require(a + b >= a, "SafeMath: addition overflow");
    return a + b;
}

function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a, "SafeMath: subtraction overflow");
    return a - b;
}

function transfer(address recipient, uint256 amount) public override returns (bool) {
    require(amount <= balanceOf(msg.sender), "Insufficient balance");

    uint256 balanceBeforeTransfer = balanceOf(msg.sender);
    uint256 balanceAfterTransfer = safeSub(balanceBeforeTransfer, amount);

    _transfer(msg.sender, recipient, amount);

    assert(balanceOf(msg.sender) == balanceAfterTransfer);
    return true;
}




}