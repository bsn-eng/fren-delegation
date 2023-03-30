import './styles.scss'
import 'twin.macro'

import { Menu, Transition } from '@headlessui/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { chain, useNetwork } from 'wagmi'

import { TMenu } from '@/types'

import Switch from '../../app/Switch'

interface IProps {
  options: TMenu[]
}

const Dropdown: FC<PropsWithChildren<IProps>> = ({ children, options }) => {
  const { switchNetwork, activeChain } = useNetwork()
  function handleOptionClick(option: TMenu): void {
    if (option.disabled) return

    if (option.onClick) {
      option.onClick()
    }
  }

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(activeChain?.id == chain.goerli.id)
  }, [activeChain?.id])

  const setNetwork = (enabled: boolean) => {
    if (switchNetwork) switchNetwork(enabled ? chain.goerli.id : chain.mainnet.id)
    setEnabled(enabled)
  }

  return (
    <Menu as="div" className="relative" style={{ height: 38 }}>
      <Menu.Button>{children}</Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Menu.Items className="menu__popup">
          {options.map((option) => (
            <Menu.Item key={option.id} disabled={option.disabled}>
              {({ active, disabled }) => (
                <div
                  className={`${active ? 'menu__item--selected' : 'menu__item'}
                    ${disabled ? 'disabled' : ''}`}
                  onClick={() => handleOptionClick(option)}>
                  {option.icon}
                  <span className="w-full">{option.label}</span>
                </div>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            <div className="flex text-sm items-center gap-1 text-white px-4 py-2">
              Testnet Mode{' '}
              <span className="mx-2 text-grey600 font-semibold">{enabled ? 'On' : 'Off'}</span>{' '}
              <Switch enabled={enabled} setEnabled={setNetwork} />
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
