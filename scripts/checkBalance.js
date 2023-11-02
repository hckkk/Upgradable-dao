async function main() {
    const AMOUNT = ethers.parseEther("0.01"); //bignumber
    let dao;
    const [owner] = await ethers.getSigners();
    dao = await ethers.getContractAt(
      "Dao", 
      "0x56291FDC3797267F94dbd21D6e4016D6C748393C", 
      owner
    );
    const daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

