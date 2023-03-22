export enum TCipStatus {
  Loading = -1,
  FullySecured = 1,
  RecoveryPending = 2,
  DownloadReady = 3,
  ReEncryptionRequired = 4
}

export interface RecoveryKeyT {
  id: string
  aesPublicKey: string
  crypto: {
    cipher: string
    ciphertext: string
    cipherparams: {
      iv: string
    }
    kdf: string
    kdfparams: {
      dklen: number
      n: number
      r: number
      p: number
      salt: string
    }
    mac: string
  }
}
