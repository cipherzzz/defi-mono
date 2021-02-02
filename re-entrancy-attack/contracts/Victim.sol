pragma solidity ^0.5.0;

contract Victim {
  
  // hardcoded for simplicity
  // would normally be something like 
  // mapping(address => uint256) balances;
  uint withdrawableBalance = .1 ether;

  function withdraw() external{
    msg.sender.transfer(withdrawableBalance);
    withdrawableBalance = 0;
  }

  function deposit() payable external {}
  
}