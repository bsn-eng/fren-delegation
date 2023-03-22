import { TransactionReceipt } from '@ethersproject/abstract-provider'

export type RageQuitResult = 'pending' | 'failure' | TransactionReceipt
