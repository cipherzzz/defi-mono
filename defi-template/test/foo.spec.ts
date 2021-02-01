import { expect, legos, parseUnits, wallet, DAI, GAS_LIMIT } from './setup';

describe('Foo', async function () {
  const daiAmountIn = parseUnits('10', legos.erc20.dai.decimals);

  it('We should have sufficient DAI balances', async function () {
    let amtBefore = await DAI.balanceOf(wallet.address);
    expect(Number(amtBefore)).to.gt(Number(daiAmountIn.mul(parseUnits('10', 0))));
  });

});
