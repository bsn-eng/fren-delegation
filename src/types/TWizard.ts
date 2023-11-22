export type TWizard = {
  savETHPool: {
    depositETHForStaking: (...args: any) => any
    batchDepositETHForStaking: (...args: any) => any
  }
  feesAndMevPool: {
    depositETHForStaking: (...args: any) => any
  }
  helper: {
    getFinalisedEpochReportForMultipleBlsKeys: (...args: any) => any
  }
}

export type TFrenValidator = {
  id: string
  ticker: string
  commission: number
}

export type TClaim = {
  mevFrenAddress: string
  earned: string
  blsPublicKey: string
  blsPublicKeyHash: string
  price: string
  proof: string[]
}
