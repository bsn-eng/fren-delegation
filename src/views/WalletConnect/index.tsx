import './styles.scss'

import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIntercom } from 'react-use-intercom'
import type { Connector } from 'wagmi'
import { useAccount, useConnect } from 'wagmi'

import Metamask from '@/assets/images/metamask.svg'
import WalletConnectIcon from '@/assets/images/walletconnect.svg'
import { ButtonWallet } from '@/components/app'
import TransactionRejectedModal from '@/components/app/Modals/TransactionRejectedModal'

const WalletConnect = () => {
  const navigate = useNavigate()
  const { boot } = useIntercom()
  const [userAddress, setUserAddress] = useState('')
  const [isFlagged, setIsFlagged] = useState(false)
  const { data: account } = useAccount()
  const [openModal, setOpenModal] = useState(false)
  const { connectAsync, connectors } = useConnect({
    onConnect() {
      if (isFlagged) {
        setOpenModal(true)
        return
      }
      navigateToHome()
    }
  })

  useEffect(() => {
    boot()
  }, [])

  useEffect(() => {
    setOpenModal(isFlagged)
  }, [isFlagged])

  const navigateToHome = useCallback(() => {
    if (account?.address !== undefined) {
      navigate('/')
    }
  }, [account?.address, userAddress])

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleConnect = async (connector: Connector) => {
    if (isFlagged) {
      setOpenModal(true)
      return
    }

    try {
      await connectAsync(connector)
    } catch (err) {
      console.error('connect wallet error: ', err)
    }
  }

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

  const fetchData = useCallback(async () => {
    if (account?.address !== undefined) {
      try {
        const response = await fetch('https://trm.joinstakehouse.com/risk', {
          method: 'POST',
          body: JSON.stringify({ address: account?.address })
        })
        const responseData = await response.json()
        const isAllowed: boolean = responseData.allowed
        setIsFlagged(!isAllowed)
        if (isAllowed) {
          navigate('/')
        }
      } catch (error) {
        console.log('Error useFlaggedWallet:', error)
        setIsFlagged(false)
      }
    }
  }, [account?.address])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="content">
      <h1 className="content__title">Connect Wallet</h1>
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
      <p className="content__guide">
        By connecting a wallet, you agree to Blockswap Labs&apos;{' '}
        <a href="./Terms" target="_blank" rel="noreferrer">
          Terms of Service
        </a>{' '}
        and acknowledge that you have read and understand the{' '}
        <a href="./RiskDisclaimer" target="_blank" rel="noreferrer">
          Stakehouse Protocol Disclaimer.
        </a>
      </p>
      <TransactionRejectedModal open={openModal} onClose={handleCloseModal} />
    </div>
  )
}

export default WalletConnect
