const { expect, ethers, wallet, Contract, provider, parseUnits, formatUnits } = require('./setup.ts');

describe('Token', () => {
    let token, owner, addr1, addr2;
    
    beforeEach( async ()=>{
        
        const tokenArtifact = require('../build/contracts/Token.json');
        token = new Contract(
          tokenArtifact.networks[process.env.NETWORK_ID].address,
          tokenArtifact.abi,
          wallet
        );

        const accounts = await provider.listAccounts();
        owner = accounts[0];
        addr1 = accounts[1];
        addr2 = accounts[2];

    });
    
    describe('Deployment', ()=>{
        it('Should set correct owner', async ()=> {
            expect(await token.owner()).to.equal(owner);
        });
    });
    
    describe('Transactions', ()=>{
        it('Should transfer tokens between accounts', async ()=> {
            const transferAmount = parseUnits("50", 18);
            const addr1Before = await token.balanceOf(addr1);
            await token.transfer(addr1, transferAmount);
            const addr1After = await token.balanceOf(addr1);
            expect(Number(addr1After)).to.equal(Number(addr1Before.add(transferAmount)));
        });
        
        it('Should fail if sender does not have enough tokens', async ()=> {
            const initialBalanceOwner = await token.balanceOf(owner);
            
            const transferAmount = parseUnits("100000", 18);
            const addr1Balance = await token.balanceOf(addr1);
            
            expect(Number(addr1Balance)).to.be.lt(Number(transferAmount));
            
            token.connect(addr1).transfer(owner, transferAmount);
            
            expect(Number(await token.balanceOf(owner))).to.equal(Number(initialBalanceOwner));        
        });
        
        // it('Should update balances after transfers', async ()=> {
        //     const initialBalanceOwner = await token.balanceOf(owner);
            
        //     await token.transfer(addr1, parseUnits("100", 18));
        //     await token.transfer(addr2, parseUnits("50", 18));
            
        //     const finalBalanceOwner = await token.balanceOf(owner);
        //     expect(Number(finalBalanceOwner)).to.equal(Number(initialBalanceOwner.sub(parseUnits("150", 18))));
            
        //     const addr1Balance = await token.balanceOf(addr1);
        //     expect(Number(addr1Balance)).to.equal(Number(parseUnits("100", 18)));
            
        //     const addr2Balance = await token.balanceOf(addr2);
        //     expect(Number(addr2Balance)).to.equal(Number(parseUnits("50", 18)));
        // });
    });
});