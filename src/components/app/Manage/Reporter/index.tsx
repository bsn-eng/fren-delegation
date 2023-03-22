import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as EthIcon } from '@/assets/images/icon-eth.svg'
import { ReactComponent as ListCheckIcon } from '@/assets/images/icon-list-check.svg'
import { useReporterMethods } from '@/hooks'

type ReporterProps = {
  handleGoBack: () => void
}

export const Reporter: FC<ReporterProps> = ({ handleGoBack }) => {
  const navigate = useNavigate()
  const { rewardBalance } = useReporterMethods()

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <Box>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <img src={ArrowLeftSVG} className="w-6 h-6 cursor-pointer" onClick={handleGoBack} />
            <Title>Reporter Dashboard</Title>
          </div>
        </div>
        <div className="w-full px-8 py-4 rounded-2xl bg-grey900 flex justify-between">
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <EthIcon />
            My Rewards
          </div>
          <div
            className="text-primary flex items-center text-sm gap-2 cursor-pointer"
            onClick={() => navigate('/manage/reporter/my-rewards')}>
            {rewardBalance} ETH <ArrowTopRightIcon />
          </div>
        </div>
      </Box>
      <InlineCTA onClick={() => navigate('/activity')}>
        <Label>
          <ListCheckIcon />
          Check your Activity and Txs
        </Label>
        <ArrowTopRightIcon />
      </InlineCTA>
      <InlineCTA isRemove onClick={() => navigate('/more/remove-wallet/reporter')}>
        <Label>
          <ListCheckIcon />
          Remove Wallet from PoN Relay
        </Label>
        <ArrowTopRightIcon />
      </InlineCTA>
    </div>
  )
}

const Box = styled.div`
  ${tw`w-full bg-grey850 mt-10 max-w-xl p-4 rounded-2xl flex flex-col gap-8`}
`
const Title = styled.div`
  ${tw`text-white font-semibold text-center w-full`}
  font-size: 32px;
`

const InlineCTA = styled.div<{ isRemove?: boolean }>`
  ${tw`w-full max-w-xl text-white flex justify-between items-center text-sm font-medium bg-[#202024] rounded-2xl py-4 px-8 cursor-pointer`}
  ${(props) => props.isRemove && tw`text-grey700 bg-opacity-30`}
`

const Label = tw.span`flex items-center gap-2`
