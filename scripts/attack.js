async function main() {
    const AMOUNT = ethers.parseEther("0.01");
    let att;
    const [owner,attack] = await ethers.getSigners();
    att = await ethers.getContractAt(
      "Attack", 
      "0x25b538057d63c02dc018c16E74063aB8c66b6635", 
      attack
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

