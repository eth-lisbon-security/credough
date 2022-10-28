// OpenZeppelin Contracts (last updated v4.7.0) (utils/escrow/Escrow.sol)
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Escrow
 * @dev Base escrow contract, holds funds designated for a payee until they
 * withdraw them.
 *
 * Intended usage: This contract (and derived escrow contracts) should be a
 * standalone contract, that only interacts with the contract that instantiated
 * it. That way, it is guaranteed that all Ether will be handled according to
 * the `Escrow` rules, and there is no need to check for payable functions or
 * transfers in the inheritance tree. The contract that uses the escrow as its
 * payment method should be its owner, and provide public methods redirecting
 * to the escrow's deposit and withdraw.
 */
contract Escrow is Ownable {
    IERC20 public immutable stableCoinToken;
    using Address for address payable;

    constructor(IERC20 _stableCoinTokenAddress) {
        stableCoinToken = _stableCoinTokenAddress;
    }

    struct Deposit {
        uint id;
        address renterAddress;
        address landlordAddress;
        uint256 depositAmount;
        uint256 disputeAmount;
        uint256 startDate;
        uint256 endDate;
        uint256 lockupPeriod;
        bool repaid;
        bool disputed;
    }

    uint idCount;
    mapping (uint256 => Deposit) deposits;

    function createDeposit(address _renterAddress, address _landlordAddress, uint256 _depositAmount, uint256 _startDate, uint256 _endDate, uint256 _lockupPeriod) public returns (uint){
        idCount += 1;         
        Deposit storage d = deposits[idCount];
        d.renterAddress = _renterAddress;
        d.landlordAddress = _landlordAddress;
        d.depositAmount = _depositAmount;
        d.startDate = _startDate;
        d.endDate = _endDate;
        d.lockupPeriod = _lockupPeriod;
        d.repaid = false;
        d.disputed = false;

        return idCount;
    }

    function payDeposit(uint depositId) public {
        require(depositId >= 1);
        
        Deposit storage deposit = deposits[depositId];
        require(deposit.renterAddress == msg.sender);
        
        deposit.repaid = true;
        stableCoinToken.transferFrom(msg.sender, address(this), deposit.depositAmount);
    }

    function withdrawDeposit(uint depositId) public {
        Deposit storage deposit = deposits[depositId];
        require(deposit.renterAddress == msg.sender);
        
        uint256 returnAmount;
        
        returnAmount = deposit.disputed ? deposit.depositAmount - deposit.disputeAmount : deposit.depositAmount;
        stableCoinToken.transferFrom(address(this), msg.sender, returnAmount);
    }
}