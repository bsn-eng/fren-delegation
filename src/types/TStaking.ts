import { Signer } from 'ethers'

import { DepositObjectT, KeystoreT } from './TBlsResponse'

export enum STAKING_MODE {
  EASY,
  EXPOERT
}

export enum EXPERT_REGISTER_STEP {
  INIT = 1,
  UPLOADED_DEPOSIT_OBJECT = 2,
  UPLOADED_KEYSTORE = 3,
  DONE = 4
}

export interface RegisterValidatorParams {
  account: string
  enoughBalance: boolean
  depositObject: DepositObjectT
  keystore: KeystoreT
  password: string
  signer: Signer
  provider: any
}
