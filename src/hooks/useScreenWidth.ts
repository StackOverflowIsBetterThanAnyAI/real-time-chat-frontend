import { useEffect, useState } from 'react'
import { useLoadScreenWidthStorageValue } from '@/hooks'
import { setItemInSessionStorage } from '@/utils'
import { ScreenWidthType } from '@/types'

export const useScreenWidth = (): ScreenWidthType => {
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
            }
        }
        window.addEventListener('resize', handleScreenWidth)
        handleScreenWidth()

        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [])

    return screenWidth
}
