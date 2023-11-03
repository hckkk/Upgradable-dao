const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Dao", function () {
  const AMOUNT = ethers.parseEther("0.01"); //bignumber
  let dao, daoAddress, attack, attackAddress;
  let owner, attacker;
  let daoBalance;
  this.timeout(80000);
  beforeEach(async function () {
    [owner, attacker] = await ethers.getSigners();

    dao = await ethers.getContractAt(
      "Dao", 
      "0xF36056C1CE7E70E2cF32926d5721E3eB1CB088bC", 
      owner
    );
    daoAddress = await dao.getAddress();
    console.log("Dao address:", daoAddress);

    attack = await ethers.getContractAt(
      "Attack", 
      "0x1002664B48E4Db795B54C0165493697e755dc161", 
      attacker
    );
    attackAddress = await attack.getAddress();
    console.log("Attack address:", attackAddress);
  });

  it("Attack should withdraw 3 * 0.1 eth from the contract", async function () {

    const txn1 = await dao.connect(owner).deposit({value: AMOUNT});
    await txn1.wait(1);
    const txn2 = await dao.connect(owner).deposit({value: AMOUNT});
    await txn2.wait(1);

    console.log("\n== Owner Deposit ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    daoBalance = await dao.balances(attackAddress);
    console.log("attacker balance:", daoBalance.toString());

    const txn3 = await attack.connect(attacker).deposit({value: AMOUNT});
    await txn3.wait(1);

    console.log("\n== Attacker (Attack) Deposit ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    daoBalance = await dao.balances(attackAddress);
    console.log("attack balance:", daoBalance.toString());

    const txn4 = await attack.connect(attacker).attack();
    await txn4.wait(1);

    console.log("\n== Attacker (Attack) Attack ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    daoBalance = await dao.balances(attackAddress);
    console.log("attack balance:", daoBalance.toString());

  });

});