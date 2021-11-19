var NuCypherToken = artifacts.require("../contracts/NuCypherToken.sol");
var StakingEscrow = artifacts.require("../contracts/StakingEscrow.sol");
var PolicyManager = artifacts.require('../contracts/PolicyManager.sol');
var Adjudicator = artifacts.require('../contracts/Adjudicator.sol');
var WorkLock = artifacts.require('../contracts/WorkLock.sol');
//var UserEscrowProxy = artifacts.require('../contracts/UserEscrowProxy.sol');

/**
 * Deploy process: https://docs.nucypher.com/en/latest/architecture/contracts.html
 */
module.exports = function(deployer) {
  let nuCypherTokenAddress;
  let stakingEscrowAddress;
  let policyManagerAddress;
  let adjudicatorAddress;
  let workLockAddress;
  let userEscrowProxyAddress;
  const _hoursPerPeriod = 0;
  const _miningCoefficient = 0;
  const _lockedPeriodsCoefficient = 0;
  const _rewardedPeriods = 0;
  const _minLockedPeriods = 0;
  const _minAllowableLockedTokens = 0;
  const _maxAllowableLockedTokens = 0;
  const _minWorkerPeriods = 0;
  const _basePenalty,
  _penaltyHistoryCoefficient,
  _percentagePenaltyCoefficient,
  _rewardCoefficient = 0;
  const _startBidDate,
  _endBidDate,
  _depositRate,
  _refundRate,
  _lockedPeriods = 0;
  deployer.deploy(NuCypherToken, web3.utils.toWei('1000000000', 'ether')).then(function(nuCypherToken) {
    nuCypherTokenAddress = nuCypherToken.address;
    return deployer.deploy(StakingEscrow, 
      nuCypherTokenAddress, 
      _hoursPerPeriod,
      _miningCoefficient,
      _lockedPeriodsCoefficient,
      _rewardedPeriods,
      _minLockedPeriods,
      _minAllowableLockedTokens,
      _maxAllowableLockedTokens,
      _minWorkerPeriods);
  }).then(function(stakingEscrow) {
    stakingEscrowAddress = stakingEscrow.address;
    return deployer.deploy(PolicyManager, stakingEscrowAddress);
  }).then(function(policyManager) {
    policyManagerAddress = policyManager.address;
    return deployer.deploy(Adjudicator,
      stakingEscrowAddress, 
      0,  // HASH, 0: KECCAK256
      _basePenalty,
      _penaltyHistoryCoefficient,
      _percentagePenaltyCoefficient,
      _rewardCoefficient);
  }).then(function(adjudicator) {
    adjudicatorAddress = adjudicator.address;
    return deployer.deploy(WorkLock,
      nuCypherTokenAddress,
      stakingEscrowAddress,
      _startBidDate,
      _endBidDate,
      _depositRate,
      _refundRate,
      _lockedPeriods);
  }).then(function(workLock) {
    workLockAddress = workLock.address;
  });
};
