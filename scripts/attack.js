async function main() {
    const AMOUNT = ethers.parseEther("0.01"); //bignumber
    let att;
    const [owner] = await ethers.getSigners();
    att = await ethers.getContractAt(
      "Attack", 
      "0x95C247aCfaB40b53d53C8FC597f538Fae5F4FE65", 
      owner
    );
    const txn1 = await att.deposit({value: AMOUNT});
    await txn1.wait(1);
    const txn2 = await att.attack();
    await txn2.wait(1);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

