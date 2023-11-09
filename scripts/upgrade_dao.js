const { ethers, upgrades } = require('hardhat');

async function main () {
  const DAOv2 = await ethers.getContractFactory('Daov2');
  console.log('Upgrading dao...');
  const dao = await upgrades.upgradeProxy('0x051d64Bd1dFd9aD651Eb6fb301B4F0292bbCEd3f', DAOv2);
  await dao.waitForDeployment();

  console.log('dao upgraded');
  console.log('dao deployed to:',await dao.getAddress());


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});