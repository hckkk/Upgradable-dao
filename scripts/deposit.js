async function main() {
    const AMOUNT = ethers.parseEther("0.01"); //bignumber
    let dao;
    const [owner] = await ethers.getSigners();
    dao = await ethers.getContractAt(
      "Dao", 
      "0x0b16B494dD36DAb5DBB1ce365311913B61B5BC3B", 
      owner
    );
    const txn1 = await dao.deposit({value: AMOUNT});
    await txn1.wait(1);
    const daoBalance = await dao.daoBalance();
    console.log("Dao balance:", daoBalance.toString());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

