pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract CafeVerde is StandardToken {
    string public name = "CafeVerde";
    string public symbol = "KG";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 12000;

    function CafeVerde() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

}



