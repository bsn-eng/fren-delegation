import { Dialog } from '@headlessui/react'
import { FC } from 'react'

// import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-icon.svg'
import { ReactComponent as ArrowTopRightGreenIcon } from '@/assets/images/icon-arrow-top-right-green.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ModalLegalPrivacy: FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.customModalLayout}>
        {/* <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div> */}
        <div className={styles.content}>
          <header className={styles.headerWrapper}>
            <div className={styles.header}>Legal and Risk Compilance</div>
            <div className="top-3 right-3 cursor-pointer" onClick={onClose}>
              <CloseCircleIcon />
            </div>
          </header>
          <p className={styles.subHeader}>This dApp uses the following APIs.</p>
          <div className={styles.listWrapper}>
            <div className={styles.item}>
              <h1 className={styles.title}>Auto Stake Router</h1>
              <p className={styles.description}>
                The dApp uses the router for transactions and balance reporting functions to fetch
                data from the consensus layer node.
              </p>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.item}>
              <h1 className={styles.title}>Ethereum Public Nodes</h1>
              <p className={styles.description}>
                The dApp fetches on-chain data from multiple publicly verifiable nodes including but
                not limited to Infura, Quicknode, etc.
              </p>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.item}>
              <h1 className={styles.title}>TRM Labs</h1>
              <p className={styles.description}>
                The dApp securely collects your wallet address and shares it with TRM Labs Inc. for
                risk and compliance reasons.
              </p>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.item}>
              <h1 className={styles.title}>The Graph</h1>
              <p className={styles.description}>
                The dApp fetches blockchain data from The Graph’s hosted data for the{' '}
                <a
                  className={styles.highlightLink}
                  href="https://thegraph.com/hosted-service/subgraph/stakehouse-dev/stakehouse-protocol"
                  target={'_blank'}
                  rel="noreferrer">
                  Stakehouse
                </a>{' '}
                and{' '}
                <a
                  className={styles.highlightLink}
                  href="https://thegraph.com/hosted-service/subgraph/stakehouse-dev/common-interest-protocol"
                  target={'_blank'}
                  rel="noreferrer">
                  CIP
                </a>{' '}
                subgraph.
              </p>
              <div className={styles.divider}></div>
            </div>
          </div>
          <a className={styles.linkBtn} href="/terms" target={'_blank'} rel="noreferrer">
            <span>dApp Terms and Conditions</span>
            <ArrowTopRightGreenIcon />
          </a>

          <a className={styles.linkBtn} href="/RiskDisclaimer" target={'_blank'} rel="noreferrer">
            <span>Protocol Disclaimer</span>
            <ArrowTopRightGreenIcon />
          </a>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalLegalPrivacy
