async function main() {
    const AMOUNT = ethers.parseEther("0.01"); //bignumber
    let att;
    const [owner] = await ethers.getSigners();
    att = await ethers.getContractAt(
      "Dao", 
      "0xd5eE301fbb8BC1a5b5aC68845e96A6bE06b54686", 
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

