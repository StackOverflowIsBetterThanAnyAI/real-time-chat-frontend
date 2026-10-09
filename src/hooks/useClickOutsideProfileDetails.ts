import { useEffect } from 'react'
import { useClickOutsideProfileDetailsProps } from '@/types'

export const useClickOutsideProfileDetails = ({
    profilePictureDetailsRef,
}: useClickOutsideProfileDetailsProps) => {
    useEffect(() => {
        const useClickOutsideProfileDetails = (e: MouseEvent) => {
            if (
                profilePictureDetailsRef.current &&
                !profilePictureDetailsRef.current.contains(e.target as Node)
            ) {
                profilePictureDetailsRef.current.open = false
            }
        }
        document.addEventListener('click', useClickOutsideProfileDetails)
        return () => {
            document.removeEventListener('click', useClickOutsideProfileDetails)
        }
    }, [profilePictureDetailsRef])
}
