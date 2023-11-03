async function main() {
    // const AMOUNT = ethers.parseEther("0.01"); //bignumber
    let dao;
    const [owner] = await ethers.getSigners();
    dao = await ethers.getContractAt(
      "Dao", 
      "0xdD9021BE14b7A4060f70743fDcBc5e38326A3B12", 
      owner
    );
    const daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
    console.log("caller balance:", await dao.balances(owner.address));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

