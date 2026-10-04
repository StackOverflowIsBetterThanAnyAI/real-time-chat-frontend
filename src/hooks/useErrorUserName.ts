'use client'

import { useEffect } from 'react'
import { USER_NAME_PATTERN } from '@/constants'
import { useErrorUserNameProps } from '@/types'

export const useErrorUserName = ({
    setErrorUserName,
    userName,
}: useErrorUserNameProps) => {
    useEffect(() => {
        if (!USER_NAME_PATTERN.test(userName) && userName.length) {
            if (userName.length < 5) {
                setErrorUserName(
                    'The user name must contain at least 5 characters.'
                )
            } else if (userName.length > 20) {
                setErrorUserName(
                    'The user name must contain at most 20 characters.'
                )
            } else {
                setErrorUserName(
                    'The user name can only contain Latin numbers and letters.'
                )
            }
        } else {
            setErrorUserName('')
        }
    }, [setErrorUserName, userName])
}
