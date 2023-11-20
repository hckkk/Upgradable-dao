async function main() {
    const AMOUNT = ethers.parseEther("0.01"); //bignumber
    let att;
    const [owner] = await ethers.getSigners();
    att = await ethers.getContractAt(
      "Dao", 
      "0x784f7d8D78B31e8c6D5190b493a6423607667F22", 
      owner
    );
    const txn1 = await att.withdraw();
    await txn1.wait(1);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

