import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import tw from 'twin.macro'

import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as CloseIcon } from '@/assets/images/close-icon.svg'
import { ReactComponent as SearchIcon } from '@/assets/images/search.svg'
import { ReactComponent as EthIcon } from '@/assets/images/icon-eth.svg'
import { ReactComponent as RightIcon } from '@/assets/images/icon-arrow-right.svg'

import { ClipboardCopy, Spinner, Tooltip } from '@/components/shared'
import { humanReadableAddress, paginate } from '@/utils/global'
import { Pagination } from '@/components/shared'
import { useValidators, useNetworkBasedLinkFactories } from '@/hooks'
import { useConnect } from 'wagmi'
import { TFrenValidator } from '../../types'

export const ValidatorList: FC = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const { isConnected, isConnecting, isReconnecting } = useConnect()

  useEffect(() => {
    if (!isConnected && !isConnecting && !isReconnecting) navigate('/sign-in')
  }, [isConnected, isConnecting])

  const { validators, loading } = useValidators()

  const [key, setKey] = useState<string>((params.get('search') ?? '') as string)
  const [currentPage, setCurrentPage] = useState<number | string>(1)

  const { makeBeaconLink } = useNetworkBasedLinkFactories()

  const handlePageChange = (pageNumber: number | string) => {
    setCurrentPage(pageNumber)
  }

  const handleChange = async (value: string) => {
    setKey(value)
  }

  const handleGoToValidator = (item: TFrenValidator) => {
    navigate(`/validator/${item.id}`)
  }

  const totalPages = useMemo(
    () =>
      validators && validators.length > 0
        ? Math.ceil(
            validators.filter((item: TFrenValidator) =>
              item.id.toLowerCase().includes(key.toLowerCase())
            ).length / 5
          )
        : 0,
    [validators, key]
  )

  const tableData = useMemo(() => {
    if (validators && validators.length > 0)
      return paginate(
        validators.filter((item: TFrenValidator) =>
          item.id.toLowerCase().includes(key.toLowerCase())
        ),
        5,
        currentPage
      )

    return null
  }, [currentPage, key, validators])

  return (
    <div className="content">
      <Box>
        <Card>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-3xl font-semibold">Available Fren Validators</div>
            <div className="text-grey700 text-base">Select a Validator to join the network</div>
          </div>
          <div className="pt-0.5 px-6 pb-4 flex flex-col gap-4">
            <div className="max-w-xl mx-auto w-full relative flex items-center">
              <input
                value={key}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Paste a BLS public key or search for a validator"
                className="w-full text-grey25 bg-black outline-none py-3 px-10 rounded-lg border border-grey500"
              />
              <div className="absolute left-3" onClick={() => handleChange('')}>
                <SearchIcon />
              </div>
              {key.length > 0 && (
                <div className="cursor-pointer absolute right-3" onClick={() => handleChange('')}>
                  <CloseIcon />
                </div>
              )}
            </div>
            <div className="rounded-lg border border-innerBorder overflow-hidden">
              <table className="w-full table-auto border-collapse">
                <TableHead>
                  <tr>
                    <TableHeadCell>
                      <Label>
                        Validator <Tooltip message="Validator address" />
                      </Label>
                    </TableHeadCell>
                    <TableHeadCell>
                      <Label className="justify-center">
                        LSD Name <Tooltip message="Total MEV earned by the validator." />
                      </Label>
                    </TableHeadCell>
                    <TableHeadCell>
                      <Label className="justify-center">
                        Fee
                        <Tooltip message="Total MEV earned by all validators compared to how much this validator has earned." />
                      </Label>
                    </TableHeadCell>
                    <TableHeadCell />
                  </tr>
                </TableHead>
                <tbody>
                  {loading && (
                    <tr className="border-t border-innerBorder bg-grey900  text-sm font-medium">
                      <TableCell colSpan={4}>
                        <div className="w-full flex items-center justify-center py-10">
                          <Spinner />
                        </div>
                      </TableCell>
                    </tr>
                  )}
                  {!loading &&
                    tableData &&
                    tableData.length > 0 &&
                    tableData.map((item: TFrenValidator, index: number) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => handleGoToValidator(item)}
                          className="cursor-pointer border-t border-innerBorder bg-grey900  text-sm font-medium">
                          <TableCell>
                            <Label>
                              <ClipboardCopy copyText={item.id}>
                                {humanReadableAddress(item.id, 9)}
                              </ClipboardCopy>
                            </Label>
                          </TableCell>
                          <TableCell className="text-center">
                            <Label className="justify-center">{item.ticker}</Label>
                          </TableCell>
                          <TableCell className="text-center text-primary">
                            <Label className="justify-center">{item.commission / 100000}%</Label>
                          </TableCell>
                          <TableCell className="text-center text-primary">
                            <Label className="justify-center">
                              <RightIcon />
                            </Label>
                          </TableCell>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Card>
      </Box>
    </div>
  )
}

const Card = tw.div`rounded-xl pt-8 pb-2 flex flex-col gap-4 text-white  bg-[#2d2e35]`
const Label = tw.div`flex items-center gap-2`

const Box = tw.div`flex flex-col gap-4 max-w-[630px] w-full`

const TableHead = tw.thead`text-xs text-grey300 bg-[#26272C]`
const TableHeadCell = tw.th`px-3 py-3 font-medium`
const TableCell = tw.td`px-3 content-center h-14`
