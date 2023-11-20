async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying attack contracts with the account:", deployer.address);
  
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy("0x0b16B494dD36DAb5DBB1ce365311913B61B5BC3B");   
  
    console.log("attack address:", await attack.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });