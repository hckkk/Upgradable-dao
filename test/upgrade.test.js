const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Dao", function () {
  const bigAMOUNT = ethers.parseEther("0.2");
  const smallAMOUNT = ethers.parseEther("0.01");
  let dao, daoAddress, attack, attackAddress;
  let owner, attacker;
  let daoBalance;
  this.timeout(150000);
  beforeEach(async function () {
    [owner, attacker] = await ethers.getSigners();

    console.log("Deploying Dao contracts with the account:", owner.address);

    const DAO = await ethers.getContractFactory('Dao');
    console.log('Deploying dao...');
    dao = await upgrades.deployProxy(DAO);
    await dao.waitForDeployment();
    daoAddress = await dao.getAddress();
    console.log('dao deployed to:', daoAddress);
  
  
    console.log("Deploying attack contracts with the account:", attacker.address);
  
    const Attack = await ethers.getContractFactory("Attack");
    attack = await Attack.deploy(daoAddress);   
    attackAddress = await attack.getAddress();
    console.log("Attack address:", attackAddress);
  });
  it("Attack should withdraw 3 * 0.1 eth from the contract", async function () {

    const txn1 = await dao.connect(owner).deposit({value: bigAMOUNT});
    await txn1.wait(1);

    console.log("\n== Owner Deposit ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("200000000000000000");
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("200000000000000000");
    daoBalance = await dao.balances(attackAddress);
    console.log("attacker balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("0");

    const txn2 = await attack.connect(attacker).deposit({value: smallAMOUNT});
    await txn2.wait(1);

    console.log("\n== Attacker (Attack) Deposit ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("210000000000000000");
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("200000000000000000");
    daoBalance = await dao.balances(attackAddress);
    console.log("attack balance:", daoBalance.toString());
    expect(daoBalance.toString()).to.equal("10000000000000000");

    const txn3 = await attack.connect(attacker).attack();
    await txn3.wait(1);

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


    try {
      const DAOv2 = await ethers.getContractFactory('Daov2');
      console.log('Upgrading Dao...');
      const dao = await upgrades.upgradeProxy(daoAddress, DAOv2);
    } catch (exceptionVar) {
      catchStatements
    } finally {
      finallyStatements
    }

    const DAOv2 = await ethers.getContractFactory('Daov2');
    console.log('Upgrading Dao...');
    const dao = await upgrades.upgradeProxy(daoAddress, DAOv2);
    await dao.waitForDeployment();
  
    console.log('Dao upgraded');
    
    const txn1 = await dao.connect(owner).deposit({value: bigAMOUNT});
    await txn1.wait(1);


    console.log("\n== Owner Deposit ==");
    daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    daoBalance = await dao.balances(owner.address);
    console.log("owner balance:", daoBalance.toString());
    daoBalance = await dao.balances(attackAddress);
    console.log("attacker balance:", daoBalance.toString());

    const txn2 = await attack.connect(attacker).deposit({value: smallAMOUNT});
    await txn2.wait(1);

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