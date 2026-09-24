'use client'

import { useEffect } from 'react'
import { useErrorConfirmPasswordProps } from '@/types/types'

export const useErrorConfirmPassword = ({
    confirmPassword,
    password,
    setErrorConfirmPassword,
}: useErrorConfirmPasswordProps) => {
    return useEffect(() => {
        if (confirmPassword !== password && confirmPassword.length) {
            setErrorConfirmPassword('The passwords do not match.')
        } else {
            setErrorConfirmPassword('')
        }
    }, [confirmPassword, password, setErrorConfirmPassword])
}
