import { Combobox, Transition } from '@headlessui/react'
import { FC, Fragment, useState } from 'react'

import { ReactComponent as CheckIcon } from '@/assets/images/icon-check-green.svg'
import { ReactComponent as SelectorIcon } from '@/assets/images/icon-chevron-down.svg'
import { TMenu } from '@/types'

interface IProps {
  selected: TMenu | undefined
  options: TMenu[]
  className?: string
  onSelect: (val: TMenu) => void
}

const ComboMenu: FC<IProps> = ({ selected, options, className, onSelect }) => {
  const [query, setQuery] = useState('')

  const filteredOption =
    query === ''
      ? options
      : options.filter((option) =>
          `${option.label}`
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className={className}>
      <Combobox value={selected} onChange={onSelect}>
        <div className="relative mt-0.5">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left border border-grey500 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-grey750 text-white focus:ring-0"
              displayValue={(option: TMenu) => (option?.label ? `${option.label}` : query)}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}>
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOption.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOption.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-grey900 font-bold' : 'text-grey900'
                      }`
                    }
                    value={person}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {person.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default ComboMenu
