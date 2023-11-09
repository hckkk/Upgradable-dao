const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Dao", function () {
  const AMOUNT = ethers.parseEther("0.01"); //bignumber
  let dao, daoAddress, attack, attackAddress;
  let owner, attacker;
  let daoBalance;
  this.timeout(150000);
  daoAddress = "0x78BD7F07902b47A4c3Eb9822076870E682eF5875";
  beforeEach(async function () {
    [owner, attacker] = await ethers.getSigners();

    dao = await ethers.getContractAt(
      "Dao", 
      daoAddress, 
      owner
    );
    console.log("Dao address:", await dao.getAddress());

    attack = await ethers.getContractAt(
      "Attack", 
      "0x730dd4780850D2A65D12431E0C71d76CE1Bf5a96", 
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
    expect(daoBalance.toString()).to.equal("20000000000000000");
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("20000000000000000");
    daoBalance = await dao.balances(attackAddress);
    console.log("attacker balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("0");

    const txn3 = await attack.connect(attacker).deposit({value: AMOUNT});
    await txn3.wait(1);

    console.log("\n== Attacker (Attack) Deposit ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("30000000000000000");
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("20000000000000000");
    daoBalance = await dao.balances(attackAddress);
    console.log("attack balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("10000000000000000");

    const txn4 = await attack.connect(attacker).attack();
    await txn4.wait(1);

    console.log("\n== Attacker (Attack) Attack ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("0");
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    daoBalance = await dao.balances(attackAddress);
    console.log("attack balance:", daoBalance.toString());

  });




  it("Attack should not withdraw eth from the contract", async function () {
    const DAOv2 = await ethers.getContractFactory('Daov2');
    console.log('Upgrading dao...');
    const dao = await upgrades.upgradeProxy(daoAddress, DAOv2);
    await dao.waitForDeployment();
  
    console.log('dao upgraded');
    
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

    await expect(attack.connect(attacker).attack()).to.be.revertedWith("Failed to withdraw sender's balance");

    console.log("\n== Attacker (Attack) Attack ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    daoBalance = await dao.balances(attackAddress);
    console.log("attack balance:", daoBalance.toString());

  });

});