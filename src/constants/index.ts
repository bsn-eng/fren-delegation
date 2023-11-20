import { chain } from 'wagmi'
import { activeNetwork } from './environment'

import GoerliInfo from '@/constants/goerli_info.json'
import MainnetInfo from '@/constants/mainnet_blskeys.json'

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

const MEV_ADDRESSES = {
  [chain.goerli.id]: '0x8396E0e4F9cAdac94BecD4c989F9C4d9191dF1C0',
  [chain.mainnet.id]: '0xe12182C3A451Ea4Eacc4782532100E7583da967F'
}

const ValidatorInfos = {
  [chain.goerli.id]: GoerliInfo,
  [chain.mainnet.id]: MainnetInfo
}

export const MEV_FREN_CONTRACT_ADDRESS = MEV_ADDRESSES[activeNetwork]
export const VALIDATORS_INFO = ValidatorInfos[activeNetwork]
