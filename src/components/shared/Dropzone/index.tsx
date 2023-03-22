import classNames from 'classnames'
import { ChangeEventHandler, FC, PropsWithChildren, useRef } from 'react'
import { FileDrop, FileDropProps } from 'react-file-drop'

import { ReactComponent as CheckIcon } from '@/assets/images/icon-check-white.svg'
import { ReactComponent as TrashIcon } from '@/assets/images/icon-trash.svg'
import { shortenStr } from '@/helpers/string'

import styles from './styles.module.scss'

export type Size = 'sm' | 'md'

interface IProps {
  uploadedFile?: File | null
  onChange: (file: File, clear: () => void) => Promise<any>
  size?: Size
  disabled?: boolean
  accept?: string
  onClear?: () => void
}

const cx = classNames.bind(styles)

const Dropzone: FC<PropsWithChildren<IProps>> = ({
  uploadedFile,
  children,
  onChange,
  size = 'md',
  disabled,
  accept = 'application/json',
  onClear = () => {}
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onTargetClick = () => {
    if (!uploadedFile) {
      fileInputRef?.current?.click()
    }
  }
  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const { files } = event.target
    const file = files ? files[0] : null
    if (!file) {
      return
    }
    await onChange(file, handleClear)
  }
  const onDrop: FileDropProps['onDrop'] = async (files) => {
    const file = files ? files[0] : null
    if (!file) {
      return
    }
    await onChange(file, handleClear)
  }

  const handleClear = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClear()
  }

  const uploadedFileName = (() => {
    if (!uploadedFile) return ''
    return shortenStr(uploadedFile.name, 4, 9)
  })()

  const uploadedFileSizeKB = (() => {
    if (!uploadedFile) return 0
    return Math.round(uploadedFile.size / 1024)
  })()

  return (
    <FileDrop
      onTargetClick={onTargetClick}
      className={cx(styles.wrapper, styles[size])}
      onDrop={onDrop}>
      <div className={cx(styles.label, { [styles.labelDisabled]: disabled })}>
        {uploadedFile ? (
          <div className={styles.uploadedFileData}>
            <div className={styles.uploadedFileName}>{uploadedFileName}</div>
            <div>{uploadedFileSizeKB} KB</div>
          </div>
        ) : (
          children
        )}
      </div>
      <div>
        {uploadedFile ? (
          <div className={styles.done}>
            Done
            <CheckIcon />
            <div className={styles.clearIcon} onClick={handleClear}>
              <TrashIcon />
            </div>
          </div>
        ) : (
          <button className={cx(styles.button, { [styles.buttonDisabled]: disabled })}>
            Choose file
          </button>
        )}
      </div>
      <input
        type={'file'}
        hidden
        onChange={onFileInputChange}
        disabled={disabled}
        accept={accept}
        ref={fileInputRef}
      />
    </FileDrop>
  )
}

export default Dropzone
