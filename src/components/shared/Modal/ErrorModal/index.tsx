import { FC } from 'react'

import { ErrorModalView, ErrorModalViewProps } from '../ErrorModalView'
import { ModalDialog, ModalDialogProps } from '../ModalDialog'

export type ErrorModalProps = ErrorModalViewProps & Omit<ModalDialogProps, 'children'>

export const ErrorModal: FC<ErrorModalProps> = (props) => {
  return (
    <ModalDialog {...props}>
      <ErrorModalView {...props} />
    </ModalDialog>
  )
}
