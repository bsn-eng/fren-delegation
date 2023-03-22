export type TPonSDK = {
  proposerRegistry: {
    registerProposer: (...args: any) => any
    ragequitProposer: (...args: any) => any
  }
  reporterRegistry: {
    registerReporter: (...args: any) => any
    getRegistry: (...args: any) => any
    ragequitReporter: (...args: any) => any
    isReporterRegistered: (...args: any) => any
  }
  payoutPool: {
    getReporterRewards: (...args: any) => any
    getProposerRewards: (...args: any) => any
    claimReporterReward: (...args: any) => any
    repayDebtAndClaimMultipleProposers: (...args: any) => any
    signer: any
  }
  builderRegistry: {
    registerBuilder: (...args: any) => any
    getMinimalStakeAmount: (...args: any) => any
    getBuilder: (...args: any) => any
    isBuilderRegistered: (...args: any) => any
    getRequiredTopUp: (...args: any) => any
    topUp: (...args: any) => any
    exitBuilder: (...args: any) => any
    positionBuilderForExit: (...args: any) => any
  }
}
