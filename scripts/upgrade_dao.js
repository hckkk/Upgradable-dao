const { ethers, upgrades } = require('hardhat');

async function main () {
  try {
    const DAOv2 = await ethers.getContractFactory('Daov2');
    console.log('Upgrading Dao...');
    const dao = await upgrades.upgradeProxy(daoAddress, DAOv2);
    await dao.waitForDeployment();
    console.log('dao upgraded');
    console.log('dao deployed to:',await dao.getAddress());
    } catch (e) {
      if (e.message.includes("doesn't look like an ERC 1967 proxy with a logic contract address")) {
      console.log('original contract is not a upgradable contract, deploying upgradable contract...');
      console.log('please deprecate old contract');
      const DAOv2 = await ethers.getContractFactory('Daov2');
      const dao = await upgrades.deployProxy(DAOv2);
      await dao.deployed();
      console.log('Daov2 deployed to:',await dao.getAddress());
      }else{
        throw e;
      }
  }
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});