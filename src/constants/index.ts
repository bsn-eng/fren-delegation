export enum REGISTER_MODE {
  MAIN = 'main',
  PROPOSER = 'proposer',
  REPORTER = 'reporter',
  BUILDER = 'builder'
}

export enum VALIDATOR_STATUS {
  LEAKING,
  ACTIVE,
  WAITING_FOR_ETH,
  READY,
  MINT_AVAILABLE,
  STAKING
}

export enum DEPOSIT_STATUS {
  DEPOSITED = 'Deposited',
  NONE = '',
  WITHDRAW_REQUEST = 'Withdraw Request',
  READY_TO_WITHDRAW = 'Ready to Withdraw',
  WITHDRAW_COMPLETE = 'Withdraw Completed',
  BUILDER_SLASHED = 'Builder is slashed, topUp is needed'
}

export const MIN_AMOUNT = 0.001
export const MAX_GAS_FEE = 0.02
