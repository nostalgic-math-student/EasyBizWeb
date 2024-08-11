// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;

    struct Payment {
        address payable recipient;
        uint256 amount;
        string description;
        bool completed;
    }

    mapping(bytes32 => Payment) public payments;

    event PaymentCreated(bytes32 indexed paymentId, address indexed recipient, uint256 amount, string description);
    event PaymentCompleted(bytes32 indexed paymentId, address indexed payer);

    constructor() {
        owner = msg.sender;
    }

    function createPayment(address payable _recipient, uint256 _amount, string memory _description) public returns (bytes32) {
        bytes32 paymentId = keccak256(abi.encodePacked(_recipient, _amount, _description, block.timestamp));
        payments[paymentId] = Payment({
            recipient: _recipient,
            amount: _amount,
            description: _description,
            completed: false
        });

        emit PaymentCreated(paymentId, _recipient, _amount, _description);
        return paymentId;
    }

    function fulfillPayment(bytes32 _paymentId) public payable {
        Payment storage payment = payments[_paymentId];
        require(msg.value == payment.amount, "Incorrect payment amount");
        require(!payment.completed, "Payment already completed");

        payment.recipient.transfer(msg.value);
        payment.completed = true;

        emit PaymentCompleted(_paymentId, msg.sender);
    }
}