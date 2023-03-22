import { FC } from 'react'

import { LoadingModalView, LoadingModalViewProps } from '../LoadingModalView'
import { ModalDialog, ModalDialogProps } from '../ModalDialog'

export type LoadingModalProps = LoadingModalViewProps & Omit<ModalDialogProps, 'children'>

export const LoadingModal: FC<LoadingModalProps> = (props) => {
  return (
    <ModalDialog {...props}>
      <LoadingModalView {...props} />
    </ModalDialog>
  )
}
