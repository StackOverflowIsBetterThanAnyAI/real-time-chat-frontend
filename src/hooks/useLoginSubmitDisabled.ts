'use client'

import { useEffect } from 'react'
import { USER_NAME_PATTERN, PASSWORD_PATTERN } from '@/constants/constants'
import { useLoginSubmitDisabledProps } from '@/types/types'

export const useLoginSubmitDisabled = ({
    confirmPassword,
    isSigningUp,
    password,
    setIsSubmitDisabled,
    userName,
}: useLoginSubmitDisabledProps) => {
    return useEffect(() => {
        if (
            (password.length &&
                password === confirmPassword &&
                USER_NAME_PATTERN.test(userName) &&
                isSigningUp) ||
            (PASSWORD_PATTERN.test(password) &&
                USER_NAME_PATTERN.test(userName) &&
                !isSigningUp)
        ) {
            setIsSubmitDisabled(false)
        } else {
            setIsSubmitDisabled(true)
        }
    }, [confirmPassword, isSigningUp, password, setIsSubmitDisabled, userName])
}
