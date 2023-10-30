async function main() {
    // const [deployer] = await ethers.getSigners();
    // console.log("Deploying contracts with the account:", deployer.address);
  
    const Dao = await ethers.getContractFactory("Dao");
    const dao = await Dao.deploy();   
  
    console.log("DAO address:", await dao.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });