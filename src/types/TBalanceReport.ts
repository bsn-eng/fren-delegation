export type BalanceReportT = {
  report: {
    blsPublicKey: string
    withdrawalCredentials: string
    slashed: false
    activeBalance: string
    effectiveBalance: string
    exitEpoch: string
    activationEpoch: string
    withdrawalEpoch: string
    currentCheckpointEpoch: number
  }
  deadline: number
  v: number
  r: string
  s: string
  error?: {
    msg: string
  }
}
