import { FC, ReactNode, useState } from 'react'

import { ReactComponent as AlertBlueIcon } from '@/assets/images/icon-alert-blue.svg'
import { KeystoreT } from '@/types'
import { parseFileAsJson } from '@/utils/global'

import Dropzone from '../../Dropzone'
import ConfirmModal from '../../Modal/ConfirmModal'
import { ErrorModal } from '../../Modal/ErrorModal'
import { Tooltip } from '../../Tooltip'

export interface UploadKeyStoreFileProps {
  onUploaded: (keystoreObject: KeystoreT) => void
  disabled?: boolean
  tooltip?: ReactNode
  onClear?: () => void
}

export const UploadKeyStoreFile: FC<UploadKeyStoreFileProps> = ({
  onUploaded,
  disabled,
  tooltip,
  onClear = () => {}
}) => {
  // states
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleUploadFile = async (_file: File) => {
    setUploadedFile(_file)
    setOpenConfirmModal(true)
  }

  const handleConfirmUpload = async () => {
    if (!uploadedFile) return
    const keystoreObject = await parseFileAsJson<KeystoreT>(uploadedFile)
    onUploaded(keystoreObject)
    setOpenConfirmModal(false)
  }

  const handleUploadedFileClear = () => {
    setOpenConfirmModal(false)
    setUploadedFile(null)
    onClear()
  }

  return (
    <>
      <Dropzone
        uploadedFile={uploadedFile}
        onChange={handleUploadFile}
        disabled={disabled}
        size="sm"
        onClear={handleUploadedFileClear}>
        <div className="flex items-center gap-2">
          <div>
            Drag and drop your <strong>keystore.json</strong> file
          </div>
          <Tooltip message={tooltip} />
        </div>
      </Dropzone>
      <ErrorModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Uploading Validator Failed"
        message="Please ensure you have uploaded the correct file."
        actionButtonContent="Try again"
        onAction={() => setIsErrorModalOpen(false)}
      />
      <ConfirmModal
        icon={<AlertBlueIcon />}
        title="Confirmation"
        message={
          <>
            Allow Stakehouse to track balance increases and decreases within your validator.
            <br />
            Stakehouse does not hold your keys. You retain ownership of your keys.
          </>
        }
        confirmButtonContent="Confirm"
        onConfirm={handleConfirmUpload}
        onClose={handleUploadedFileClear}
        open={openConfirmModal}
      />
    </>
  )
}
