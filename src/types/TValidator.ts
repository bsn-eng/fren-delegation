export type ValidatorT = {
  id: string // bls public key; called address in the UI
  lifecycleStatus: ValidatorLifecycleStatuses
  depositTxHash: string
  totalDETHMinted: string
  totalCollateralizedSLOTInVaultFormatted: number
  totalSLOT: string
  sETHMinted: string
  mintFromBlockNumber?: number
  // null when user has not joined or created a stakehouse
  stakeHouseMetadata?: {
    id: string // address of stakehouse
    sETH: string
    sETHExchangeRate: string
    sETHTicker: string
    sETHPayoffRateFormatted: string
  }
  // null when user has not joined or created a stakehouse
  knotMetadata?: {
    isPartOfIndex: boolean
    savETHIndexId: string
  }
}

export enum ValidatorLifecycleStatuses {
  // initial state used in smart contract, will never be seen on front-end
  init = '0',
  credentialsRegistered = '1',
  depositCompleted = '2',
  derivativesMinted = '3',
  exited = '4'
}
