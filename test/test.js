const { expect } = require("chai");


describe("Dao", function () {
  it("shoud deploy and store 1 eth and with draw one eth", async function () {
    const [owner] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", owner.address);

    const Dao = await ethers.deployContract("Dao");
    console.log("Dao address:", await Dao.getAddress());

    const DaoBalance = await Dao.daoBalance();
    console.log("Dao balance:", DaoBalance.toString());


  });
});