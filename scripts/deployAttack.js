async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy("0xF36056C1CE7E70E2cF32926d5721E3eB1CB088bC");   
  
    console.log("attack address:", await attack.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });