const Victim = artifacts.require('Victim')
const Attacker = artifacts.require('Attacker')

module.exports = function(deployer) {
  deployer
    .deploy(Victim)
    .then(() =>
      deployer.deploy(Attacker, Victim.address)
    )
}