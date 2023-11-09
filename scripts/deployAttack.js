async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy("0x78BD7F07902b47A4c3Eb9822076870E682eF5875");   
  
    console.log("attack address:", await attack.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });