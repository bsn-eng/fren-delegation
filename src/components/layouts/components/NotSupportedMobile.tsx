import { FC } from 'react'

import { ReactComponent as ArrowLeftIcon } from '@/assets/images/arrow-left.svg'
import { ReactComponent as BlogIcon } from '@/assets/images/icon-blue-blog.svg'
import { ReactComponent as DiscordIcon } from '@/assets/images/icon-blue-discord.svg'
import { ReactComponent as DocsIcon } from '@/assets/images/icon-blue-docs.svg'
import { ReactComponent as TwitterIcon } from '@/assets/images/icon-blue-twitter.svg'
import { Button } from '@/components/shared'

const NotSupportedMobile: FC = () => {
  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-3xl font-semibold text-white mb-8">
        <span className="text-primary">Stakehouse dApp</span> is not available on mobile.
      </h1>
      <a href="https://joinstakehouse.com">
        <Button variant="secondary" className="w-full mb-10">
          <div className="flex items-center gap-2 w-full justify-center">
            <ArrowLeftIcon />
            <span className="text-base font-medium text-grey100">Stakehouse Website</span>
          </div>
        </Button>
      </a>
      <a
        href="https://docs.joinstakehouse.com/protocol/learn/stakehouse"
        target="_blank"
        rel="noreferrer"
        className="p-3 gap-4 flex items-center text-base font-semibold text-grey25">
        <DocsIcon />
        Documentation
      </a>
      <a
        href="https://blog.blockswap.network"
        target="_blank"
        rel="noreferrer"
        className="p-3 gap-4 flex items-center text-base font-semibold text-grey25">
        <BlogIcon />
        Blog
      </a>
      <a
        href="https://twitter.com/blockswap_team"
        target="_blank"
        rel="noreferrer"
        className="p-3 gap-4 flex items-center text-base font-semibold text-grey25">
        <TwitterIcon />
        Twitter
      </a>
      <a
        href="https://discord.gg/s8N9ekQuuj"
        target="_blank"
        rel="noreferrer"
        className="p-3 gap-4 flex items-center text-base font-semibold text-grey25">
        <DiscordIcon />
        Discord
      </a>
    </div>
  )
}

export default NotSupportedMobile
