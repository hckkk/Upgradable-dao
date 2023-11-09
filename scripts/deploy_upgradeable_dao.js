const { ethers, upgrades } = require('hardhat');

async function main () {
  const DAO = await ethers.getContractFactory('Dao');
  console.log('Deploying dao...');
  const dao = await upgrades.deployProxy(DAO);
  await dao.waitForDeployment();
  console.log('dao deployed to:',await dao.getAddress());

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});