import './styles.scss'

import { Menu, Transition } from '@headlessui/react'
import { FC, PropsWithChildren } from 'react'

import { TMenu } from '@/types'

interface IProps {
  options: TMenu[]
}

const Dropdown: FC<PropsWithChildren<IProps>> = ({ children, options }) => {
  function handleOptionClick(option: TMenu): void {
    if (option.disabled) return

    if (option.onClick) {
      option.onClick()
    }
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
                  <span>{option.label}</span>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
