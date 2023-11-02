async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy();   
  
    console.log("attack address:", await attack.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });