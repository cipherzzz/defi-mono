import {
  provider,
  expect,
  legos,
  parseUnits,
  formatUnits,
  wallet,
  DAI,
  GAS_LIMIT,
  vulnerableContract,
  attackerContract,
} from './setup';

describe('Attacker Contract', async function () {
  const ethAmountIn = parseUnits('1', legos.erc20.decimals);
  const ethAmountInGas = parseUnits('.01', legos.erc20.decimals);

  it('Wallet should deposit amt + gas to Attacker Contract', async function () {
    let amtWalletBefore = await provider.getBalance(wallet.address);

    await vulnerableContract.deposit({ value: ethAmountIn, gasLimit: GAS_LIMIT });

    let amtAttackerBefore = await provider.getBalance(attackerContract.address);
    let amtVictimBefore = await provider.getBalance(vulnerableContract.address);

    console.log('amtAttackerBefore', formatUnits(amtAttackerBefore, 18));
    console.log('amtVictimBefore', formatUnits(amtVictimBefore, 18));

    try {
      await attackerContract.attack({ gasLimit: GAS_LIMIT });
    } catch (error) {}

    let amtAttackerAfter = await provider.getBalance(attackerContract.address);
    let amtVictimAfter = await provider.getBalance(vulnerableContract.address);

    console.log('amtAttackerAfter', formatUnits(amtAttackerAfter, 18));
    console.log('amtVictimAfter', formatUnits(amtVictimAfter, 18));

    expect(Number(amtAttackerAfter)).to.be.closeTo(
      Number(amtAttackerBefore.add(ethAmountInGas.add(ethAmountIn))),
      Number(parseUnits('.05', legos.erc20.decimals))
    );

    let amtWalletAfter = await provider.getBalance(wallet.address);
    expect(Number(amtWalletAfter)).to.be.closeTo(
      Number(amtWalletBefore.sub(ethAmountIn.add(ethAmountInGas))),
      Number(parseUnits('.05', legos.erc20.decimals))
    );
  });

  // it('Attacker should start attack', async function () {
  //   let amtBefore = await provider.getBalance(vulnerableContract.address);
  //   console.log(formatUnits(amtBefore, 18));
  //   await attackerContract.start(ethAmountIn, vulnerableContract.address, {gasLimit: GAS_LIMIT});
  //   let amtAfter = await provider.getBalance(vulnerableContract.address);
  //   console.log(formatUnits(amtAfter, 18));
  //   let diff = amtAfter.sub(amtBefore);
  //   expect(Number(diff)).to.be.closeTo(Number(ethAmountIn), Number(parseUnits('.005', legos.erc20.decimals)));
  // });
});
