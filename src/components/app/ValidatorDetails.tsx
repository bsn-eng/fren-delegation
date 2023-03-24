import tw from 'twin.macro'

import { ClipboardCopy, Tooltip } from '../shared'

export default function ValidatorDetails({ blsKey }: { blsKey: string }) {
  const isKeyValid = blsKey.length > 0

  return (
    <>
      {isKeyValid && (
        <div className="flex flex-col gap-2 w-full">
          <Box>
            <div className="text-grey700">Validator&apos;s Details</div>
            <Stat>
              <Label>
                LSD Network Name{' '}
                <Tooltip message="This is the LSD Network that the selected validator is a part of." />
              </Label>
              <span className="font-semibold">LSD Name 3</span>
            </Stat>
            <Stat>
              <Label>
                BLS Key <Tooltip message="The selected validator address." />
              </Label>
              <span className="flex items-center gap-2">
                0x999ef6789...1v13x0 <ClipboardCopy copyText="sss" />
              </span>
            </Stat>
            <Stat>
              <Label>
                Node operator name <Tooltip message="The name of your node operator." />
              </Label>
              <span className="">Dappnode</span>
            </Stat>
          </Box>
          <Box>
            <div className="text-grey700">Total delegation available</div>
            <Stat>
              <Label>
                Protected Staking <Tooltip message="Receive dETH and rewards in dETH." />
              </Label>
              <span className="text-grey700">
                <span className="text-primary">2.456</span> / 24 ETH
              </span>
            </Stat>
            <Stat>
              <Label>
                MEV Staking{' '}
                <Tooltip message="Receive free floating SLOT tokens and rewards in ETH." />
              </Label>
              <span className="text-grey700">
                <span className="">0.0</span> / 4 ETH
              </span>
            </Stat>
          </Box>
        </div>
      )}
    </>
  )
}

const Box = tw.div`bg-grey900 w-full rounded-2xl py-4 px-8 text-sm text-white font-medium flex flex-col gap-2`
const Label = tw.span`flex gap-1 items-center`
const Stat = tw.div`flex justify-between`
