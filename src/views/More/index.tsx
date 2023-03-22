import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as BookIcon } from '@/assets/images/icon-book.svg'
import { ReactComponent as HelperIcon } from '@/assets/images/icon-helper.svg'
import { ReactComponent as WebsiteIcon } from '@/assets/images/icon-website.svg'

const More: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="content">
      <div className="w-full text-center text-4xl font-semibold text-white">
        Additional Resources
      </div>

      <div className="flex flex-col gap-2 mt-10 max-w-xl w-full">
        <Link>
          <Label>
            <BookIcon />
            Docs
          </Label>
          <ArrowTopRightIcon />
        </Link>
        <Link>
          <Label>
            <HelperIcon />
            Help Center
          </Label>
          <ArrowTopRightIcon />
        </Link>
        <Link>
          <Label>
            <WebsiteIcon />
            Website
          </Label>
          <ArrowTopRightIcon />
        </Link>
        {/* <Link isRemove onClick={() => navigate('remove-wallet')}>
          Remove Wallet from PoN Relay
          <ArrowTopRightIcon />
        </Link> */}
      </div>
    </div>
  )
}
export default More

const Link = styled.div<{ isRemove?: boolean }>`
  ${tw`flex justify-between items-center bg-grey900 w-full text-white px-8 py-4 text-sm font-medium rounded-2xl cursor-pointer`}
  ${(props) => props.isRemove && tw`text-grey700 bg-opacity-30`}
`
const Label = tw.div`flex items-center gap-2`
