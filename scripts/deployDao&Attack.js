async function main() {
  const bigAmount = ethers.parseEther("0.1"); //bignumber
  const smallAmount = ethers.parseEther("0.01"); //bignumber
  const [owner, attacker] = await ethers.getSigners();
  let dao, daoAddress, attack, attackAddress;
  let daoBalance;
  console.log("Deploying Dao contracts with the account:", owner.address);

  const Dao = await ethers.getContractFactory("Dao");
  dao = await Dao.deploy();
  daoAddress = await dao.getAddress();
  console.log("DAO address:", daoAddress);


  console.log("Deploying attack contracts with the account:", attacker.address);

  const Attack = await ethers.getContractFactory("Attack");
  attack = await Attack.deploy(daoAddress);   

  console.log("attack address:", await attack.getAddress());


  const txn1 = await dao.deposit({value: bigAmount});
  await txn1.wait(1);
  daoBalance = await dao.daoBalance();
  console.log("Dao balance:", daoBalance.toString());

  const txn2 = await attack.deposit({value: smallAmount});  
  await txn2.wait(1);
  daoBalance = await dao.daoBalance();
  console.log("Dao balance:", daoBalance.toString()); 
    
  const txn3 = await attack.attack();
  await txn3.wait(1);
  daoBalance = await dao.daoBalance();
  console.log("Dao balance:", daoBalance.toString());



  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });