import { useLocalStorage } from 'react-use'

import { BACKUP_FILE_DOWNLOADS_MAP_LKEY } from '@/constants/storage'
import { TCipStatus } from '@/types/cip'

export const useBackupFileDownloadsMapStorage = () => {
  const isBackupFileDownloaded = (validatorId: string, decryptionStatus: TCipStatus) => {
    const downloadTimestamp = backupFileDownloadsMap?.[validatorId] || 0
    const timeLeftMs = Date.now() - downloadTimestamp
    const lockUpTimeMs = 75600000 // 21 hours

    return timeLeftMs < lockUpTimeMs && decryptionStatus !== TCipStatus.Loading
  }

  const [backupFileDownloadsMap, saveBackupFileDownloadsMap] = useLocalStorage<{
    [key: string]: number
  }>(BACKUP_FILE_DOWNLOADS_MAP_LKEY, {})

  return { backupFileDownloadsMap, saveBackupFileDownloadsMap, isBackupFileDownloaded }
}
