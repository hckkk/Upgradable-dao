const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Dao", function () {
  const AMOUNT = ethers.parseEther("0.01"); //bignumber
  let dao;

  beforeEach(async function () {
    const [owner] = await ethers.getSigners();
    dao = await ethers.getContractAt(
      "Dao", 
      "0x30B3E9c45CeaDAC0C815a6047F5aDe1518c155Df", 
      owner
    );
  });

  it("Attack", async function () {
    // const txn2 = await dao.withdraw();
    // await txn2.wait(1);
    // const daoBalance = await dao.daoBalance();
    // expect(daoBalance.toString()).to.equal("0");
    // console.log("Dao balance:", daoBalance.toString());
  });

});