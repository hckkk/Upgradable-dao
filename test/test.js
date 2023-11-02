const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Dao", function () {
  const AMOUNT = ethers.parseEther("0.01"); //bignumber
  let dao;

  beforeEach(async function () {
    const [owner] = await ethers.getSigners();
    dao = await ethers.getContractAt(
      "Dao", 
      "0xdD039Ebb9D52A21b2844Fdf22fC5D4C7186762DB", 
      owner
    );
  });

  it("Should deploy with 0 initial daoBalance", async function () {
    const daoBalance = await dao.daoBalance();
    expect(daoBalance.toString()).to.equal("0");
    console.log("Dao balance:", daoBalance.toString());
  });

  it("Should accept deposit {AMOUNT} eth and have {AMOUNT} eth daoBalance", async function () {
    const txn1 = await dao.deposit({value: AMOUNT});
    await txn1.wait(1);
    const daoBalance = await dao.daoBalance();
    expect(daoBalance.toString()).to.equal(AMOUNT.toString());
    console.log("Dao balance:", daoBalance.toString());
  });

  it("Should accept withdraw and have 0 daoBalance in the end", async function () {
    const txn2 = await dao.withdraw();
    await txn2.wait(1);
    const daoBalance = await dao.daoBalance();
    expect(daoBalance.toString()).to.equal("0");
    console.log("Dao balance:", daoBalance.toString());
  });

  it("Attack", async function () {
    // const txn2 = await dao.withdraw();
    // await txn2.wait(1);
    // const daoBalance = await dao.daoBalance();
    // expect(daoBalance.toString()).to.equal("0");
    // console.log("Dao balance:", daoBalance.toString());
  });

});