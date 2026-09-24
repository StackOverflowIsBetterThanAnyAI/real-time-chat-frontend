'use client'

import { useEffect } from 'react'
import { PASSWORD_PATTERN } from '@/constants/constants'
import { useErrorPasswordProps } from '@/types/types'

export const useErrorPassword = ({
    password,
    setConfirmPasswordDisabled,
    setErrorPassword,
}: useErrorPasswordProps) => {
    return useEffect(() => {
        if (!PASSWORD_PATTERN.test(password) && password.length) {
            if (password.length < 8) {
                setErrorPassword(
                    'The password must contain at least 8 characters.'
                )
            } else if (password.length > 25) {
                setErrorPassword(
                    'The password must contain at most 25 characters.'
                )
            } else {
                setErrorPassword(
                    'The password must not contain any whitespace characters.'
                )
            }
            setConfirmPasswordDisabled(true)
        } else {
            setErrorPassword('')
            if (!password.length) {
                setConfirmPasswordDisabled(true)
            } else {
                setConfirmPasswordDisabled(false)
            }
        }
    }, [password, setConfirmPasswordDisabled, setErrorPassword])
}
