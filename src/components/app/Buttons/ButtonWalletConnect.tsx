import './styles.scss'

import { FC, useContext, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

import { ModalAccount } from '@/components/app'
import { Button } from '@/components/shared'

const ButtonWalletConnect: FC = () => {
  const { data: account } = useAccount()
  const { disconnect } = useDisconnect()

  const [openAccountModal, setOpenAccountModal] = useState(false)

  const handleDisconnect = () => {
    setOpenAccountModal(false)
    disconnect()
  }

  if (account) {
    account.address = '0x97b1043abd9e6fc31681635166d430a458d14f9c'
    return (
      <>
        <Button variant="secondary" onClick={() => setOpenAccountModal(true)}>
          <div className="connect-wallet--secondary flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            {`${account.address!.slice(0, 4)}...${account.address!.slice(-2)}`}
          </div>
        </Button>
        <ModalAccount
          open={openAccountModal}
          onClose={() => setOpenAccountModal(false)}
          accountAddress={account.address!}
          onDisconnect={handleDisconnect}
        />
      </>
    )
  }

  return <></>
}

export default ButtonWalletConnect
