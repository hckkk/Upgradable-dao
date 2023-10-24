const { expect } = require("chai");


describe("Dao", function () {
  it("shoud deploy and store 1 eth and with draw one eth", async function () {
    const [owner] = await ethers.getSigners();

    const Dao = await ethers.deployContract("Dao");
    console.log("Dao deployed to:", Dao.address);

  });
});