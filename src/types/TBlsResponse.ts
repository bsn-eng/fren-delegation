export type BlsResponseT = {
  depositObject: DepositObjectT
  keystore: KeystoreT
}

export type DepositObjectT = {
  amount: number
  deposit_cli_version: string
  deposit_data_root: string
  deposit_message_root: string
  eth2_network_name: string
  fork_version: string
  pubkey: string
  signature: string
  withdrawal_credentials: string
}[]

export type IProposer = {
  status: string
  id: string
  activationBlock: string
}
export type KeystoreT = {
  version: string
  path: string
  pubkey: string
  uuid: string
  crypto: {
    checksum: {
      function: string
      message: string
      params: Object
    }
    cipher: {
      function: string
      message: string
      params: Object
    }
    kdf: {
      function: string
      message: string
      params: Object
    }
  }
}
export type BlsAuthenticateResponse = {
  cipher_text: string
  encryptor_aes_key: string
  deadline: string
  deposit_data: DepositObjectT
  r: string
  s: string
  v: number
}
