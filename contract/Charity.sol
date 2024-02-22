//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CharityFund is Ownable, AccessControl {
    uint256 public _totalCharities;
    uint256 public _totalDonation;

    uint256 public charityTax;

    mapping(uint256 => CharityStruct) charities;
    mapping(uint256 => SupportStruct[]) supportersOf;
    mapping(uint256 => bool) public charityExist;

    struct CharityStruct {
        uint256 id;
        address owner;
        string name;
        string userName;
        string description;
        string image;
        string social;
        uint256 amount;
        uint256 donations;
        uint256 raised;
        uint256 timestamp;
        bool deleted;
        bool banned;
    }

    struct SupportStruct {
        uint256 id;
        uint256 cid;
        string userName;
        uint256 amount;
        uint256 timestamp;
        string comment;
        address supporter;
    }

    constructor(
        address initialOwner,
        uint256 _charityTax
    ) Ownable(initialOwner) {
        charityTax = _charityTax;
        _totalCharities = 0;
        _totalDonation = 0;
    }

    function createCharity(
        string memory name,
        string memory userName,
        string memory social,
        string memory description,
        string memory image,
        uint256 amount
    ) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(userName).length > 0, "UserName cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(social).length > 0, "social cannot be empty");
        require(bytes(image).length > 0, "Image cannot be empty");
        require(amount > 0 ether, "Amount cannot be zero");

        _totalCharities++;
        CharityStruct memory charity;
        charity.id = _totalCharities;
        charity.owner = msg.sender;
        charity.name = name;
        charity.userName = userName;
        charity.description = description;
        charity.image = image;
        charity.social = social;
        charity.amount = amount;
        charity.timestamp = currentTime();
        charities[charity.id] = charity;
        charityExist[charity.id] = true;
    }

    function updateCharity(
        uint256 id,
        string memory name,
        string memory userName,
        string memory social,
        string memory description,
        string memory image,
        uint256 amount
    ) public {
        require(charityExist[id], "Charity Not Found");
        require(msg.sender == charities[id].owner, "Unauthorized Entity");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(userName).length > 0, "UserName cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(social).length > 0, "social cannot be empty");
        require(bytes(image).length > 0, "Image cannot be empty");
        require(amount > 0 ether, "Amount cannot be zero");

        charities[id].name = name;
        charities[id].userName = userName;
        charities[id].image = image;
        charities[id].amount = amount;
        charities[id].social = social;
        charities[id].description = description;
    }

    function deleteCharity(uint256 id) public {
        require(charityExist[id], "Charity Not Found");
        require(msg.sender == charities[id].owner, "Unauthorized Entity");
        charities[id].deleted = true;
    }

    function toggleBan(uint256 id) public onlyOwner {
        require(charityExist[id], "Charity Not Found");
        charities[id].banned = !charities[id].banned;
    }

    function donate(
        uint256 id,
        string memory userName,
        string memory comment
    ) public payable {
        require(charityExist[id], "Charity Not Found");
        require(!charities[id].banned, "Charity Banned, contact admin");
        require(msg.value > 0, "Donation cannot be zero");
        require(
            charities[id].raised < charities[id].amount,
            "Charity budget fulfilled"
        );

        _totalDonation++;

        SupportStruct memory support;
        support.id = _totalDonation;
        support.cid = id;
        support.userName = userName;
        support.supporter = msg.sender;
        support.amount = msg.value;
        support.comment = comment;
        support.timestamp = currentTime();
        supportersOf[id].push(support);

        charities[id].raised += msg.value;
        charities[id].donations += 1;

        uint256 fee = (msg.value * charityTax) / 100;
        uint256 payment = msg.value - fee;

        payTo(charities[id].owner, payment);
        payTo(owner(), fee);
    }

    function changeTax(uint256 _taxPct) public onlyOwner {
        require(
            _taxPct > 0 && _taxPct <= 100,
            "Percent must be between 0 - 100"
        );
        charityTax = _taxPct;
    }

    function getCharity(uint256 id) public view returns (CharityStruct memory) {
        return charities[id];
    }

    function getCharities()
        public
        view
        returns (CharityStruct[] memory Charities)
    {
        CharityStruct[] memory result = new CharityStruct[](_totalCharities);
        uint256 index;
        for (uint256 i = 1; i <= _totalCharities; i++) {
            result[index++] = charities[i];
        }
        return result;
    }

    function getMyCharities()
        public
        view
        returns (CharityStruct[] memory Charities)
    {
        uint256 available;
        for (uint256 i = 1; i <= _totalCharities; i++) {
            if (charities[i].owner == msg.sender) {
                available++;
            }
        }

        Charities = new CharityStruct[](available);

        uint256 index;
        for (uint256 i = 1; i <= _totalCharities; i++) {
            if (charities[i].owner == msg.sender) {
                Charities[index++] = charities[i];
            }
        }
    }

    function getSupports(
        uint256 id
    ) public view returns (SupportStruct[] memory) {
        return supportersOf[id];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function currentTime() internal view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
    }
}
