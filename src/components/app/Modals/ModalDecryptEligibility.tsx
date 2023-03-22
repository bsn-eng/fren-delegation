import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, DefaultModalView, ModalDialog } from '@/components/shared'
import { useSDK } from '@/hooks'
import { ValidatorT } from '@/types'
import { noty } from '@/utils/global'

export interface ModalDecryptEligibilityProps {
  open: boolean
  validator: ValidatorT | undefined | null
  onClose: () => void
}

const KNOT_SLASHED_ERROR_MESSAGE = 'Error: The KNOT has been slashed'
const VALID_APPLICATION_PRESENT_ERROR_MESSAGE = 'Error: Valid application already present'
const SLOT_BALANCE_TOO_LOW_ERROR_MESSAGE = 'Error: Applicant SLOT balance less than 2'

const ModalDecryptEligibility: FC<ModalDecryptEligibilityProps> = ({
  open,
  validator,
  onClose
}) => {
  const { sdk } = useSDK()
  const [eligibilityCheckError, setEligibilityCheckError] = useState('')
  const [isEligibilityCheckLoading, setIsEligibilityCheckLoading] = useState(true)

  const validatorId = validator?.id || ''
  const isEligible = !eligibilityCheckError

  const isLoading = (() => {
    return !validator || isEligibilityCheckLoading
  })()

  const message = (() => {
    if (isLoading) return ''

    if (eligibilityCheckError) {
      return (
        <div className="flex flex-col gap-2">
          <div>
            You are&nbsp;
            <span className="text-danger">not eligible</span>
            &nbsp;for validator recovery.
          </div>
          <div style={{ margin: 'auto' }}>{eligibilityCheckError}</div>
          <div>
            <a
              href="https://help.joinstakehouse.com/en/articles/6326534-what-is-the-common-interest-protocol"
              target="_blank"
              className="text-primary transition hover:opacity-75"
              rel="noreferrer">
              Learn more
            </a>
          </div>
        </div>
      )
    }

    return 'You are eligible for validator recovery.'
  })()

  useEffect(() => {
    if (open && validator) {
      checkEligibility()
    }
  }, [validator, open])

  function handleClose() {
    onClose()
    setEligibilityCheckError('')
    setIsEligibilityCheckLoading(true)
  }

  async function checkEligibility() {
    try {
      if (!validator || !sdk || !validator.stakeHouseMetadata) {
        noty('User has not joined or created a stakehouse')
        throw new Error('User has not joined or created a stakehouse')
      }

      setIsEligibilityCheckLoading(true)

      await sdk.cip.decryptionEligibilityChecks(validator.id, validator.stakeHouseMetadata.id)

      setEligibilityCheckError('')
    } catch (err) {
      const errorMessage = (err as any)?.message
      if (errorMessage === KNOT_SLASHED_ERROR_MESSAGE) {
        setEligibilityCheckError('This KNOT has leaked. Please top-up the KNOT.')
      } else if (errorMessage === VALID_APPLICATION_PRESENT_ERROR_MESSAGE) {
        setEligibilityCheckError(
          'Your recovery request has been successfully processed less than 21 hours ago'
        )
      } else if (errorMessage === SLOT_BALANCE_TOO_LOW_ERROR_MESSAGE) {
        setEligibilityCheckError(
          'Your collateralized SLOT balance does not exceed the minimum threshold of 2'
        )
      } else {
        console.error(err)
        setEligibilityCheckError(errorMessage || 'Unexpected error')
      }
    } finally {
      setIsEligibilityCheckLoading(false)
    }
  }

  return (
    <ModalDialog open={open} onClose={handleClose} controlsClosableOnly>
      <DefaultModalView title="Eligibility Status" loading={isLoading} message={message}>
        <div className="flex flex-col gap-2.5">
          {isEligible && (
            <Link to={`/decrypt/${validatorId}`}>
              <Button className="w-full" size="lg">
                Continue
              </Button>
            </Link>
          )}
        </div>
      </DefaultModalView>
    </ModalDialog>
  )
}

export default ModalDecryptEligibility
