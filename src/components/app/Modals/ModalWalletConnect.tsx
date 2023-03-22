import { Dialog } from '@headlessui/react'
import { FC } from 'react'
import { Connector, useConnect } from 'wagmi'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import Metamask from '@/assets/images/metamask.svg'
import WalletConnectIcon from '@/assets/images/walletconnect.svg'
import { Modal } from '@/components/shared'

import { ButtonWallet } from '../Buttons'
import styles from './styles.module.scss'

interface IModalWalletConnectProps {
  open: boolean
  onClose: () => void
}

const ModalWalletConnect: FC<IModalWalletConnectProps> = ({ open, onClose }) => {
  const { connectAsync, connectors } = useConnect({
    onConnect() {
      onClose()
    }
  })

  const getConnectorIcon = (connector: Connector) => {
    switch (connector.name) {
      case 'MetaMask':
        return Metamask
      case 'WalletConnect':
        return WalletConnectIcon
      default:
        return ''
    }
  }

  const getConnectorLabel = (connector: Connector) => {
    return connector.name
  }

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync(connector)
    } catch (err) {
      console.error('connect wallet error: ', err)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl text-white font-semibold">Connect a Wallet</p>
          {connectors.map((connector) => {
            if (!connector.ready) return null
            return (
              <ButtonWallet
                key={connector.name}
                icon={getConnectorIcon(connector)}
                label={getConnectorLabel(connector)}
                onClick={() => handleConnect(connector)}
              />
            )
          })}
          <p className="text-xs text-grey300 text-left">
            {`By connecting a wallet, you agree to Blockswap Labs'`}{' '}
            <a className="text-primary underline">Terms of Service</a> and acknowledge that you have
            read and understand the{' '}
            <a className="text-primary underline">Blockswap Protocol Disclaimer</a>.
          </p>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalWalletConnect
