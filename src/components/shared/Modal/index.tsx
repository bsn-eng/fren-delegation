import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, PropsWithChildren, useRef } from 'react'

interface IProps {
  open: boolean
  onClose: () => void
}

const Modal: FC<PropsWithChildren<IProps>> = ({ open, onClose, children }) => {
  const refDiv = useRef(null)

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog initialFocus={refDiv} as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0" style={{ background: 'rgba(52,64,84,0.75)' }} />
        </Transition.Child>

        <div ref={refDiv} className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
