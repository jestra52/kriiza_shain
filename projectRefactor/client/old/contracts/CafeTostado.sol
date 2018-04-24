pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract CafeTostado is StandardToken {
    string public name = "CafeTostado";
    string public symbol = "KG";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 12000;

    function CafeTostado() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    

}

