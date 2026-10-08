import { useEffect } from 'react'
import { useClickOutsideProfileDetailsProps } from '@/types'

export const useClickOutsideProfileDetails = ({
    detailsRef,
}: useClickOutsideProfileDetailsProps) => {
    useEffect(() => {
        const useClickOutsideProfileDetails = (e: MouseEvent) => {
            if (
                detailsRef.current &&
                !detailsRef.current.contains(e.target as Node)
            ) {
                detailsRef.current.open = false
            }
        }
        document.addEventListener('click', useClickOutsideProfileDetails)
        return () => {
            document.removeEventListener('click', useClickOutsideProfileDetails)
        }
    }, [detailsRef])
}
