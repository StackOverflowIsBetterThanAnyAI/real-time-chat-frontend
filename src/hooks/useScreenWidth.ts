import { useEffect, useState } from 'react'
import { useLoadScreenWidthStorageValue } from '@/hooks'
import { setItemInSessionStorage } from '@/utils'
import { ScreenWidthType, useScreenWidthProps } from '@/types'

export const useScreenWidth = ({
    setIsSidebarExpanded,
}: useScreenWidthProps): ScreenWidthType => {
    const [screenWidth, setScreenWidth] = useState<ScreenWidthType>('MOBILE')

    useLoadScreenWidthStorageValue({ setScreenWidth })

    useEffect(() => {
        const handleScreenWidth = () => {
            if (window.innerWidth < 640) {
                setScreenWidth('MOBILE')
                setItemInSessionStorage('screenwidth', 'MOBILE')
            } else {
                setScreenWidth('NOT_MOBILE')
                setItemInSessionStorage('screenwidth', 'NOT_MOBILE')
                setIsSidebarExpanded(false)
                setItemInSessionStorage('issidebarexpanded', false)
            }
        }
        window.addEventListener('resize', handleScreenWidth)
        handleScreenWidth()

        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [setIsSidebarExpanded])

    return screenWidth
}
