import 'twin.macro'

import { Switch as HeadlessSwitch } from '@headlessui/react'

export default function Switch({
  enabled,
  setEnabled
}: {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}) {
  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-grey200' : 'bg-grey200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}>
      <span
        className={`${
          enabled ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-grey500'
        } inline-block h-4 w-4 transform rounded-full transition`}
      />
    </HeadlessSwitch>
  )
}
