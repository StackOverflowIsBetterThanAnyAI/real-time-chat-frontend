import { handleLogoutProps } from '@/types/types'
import { getStoredData } from '@/utils/getStoredData'
import { getStoredSessionData } from '@/utils/getStoredSessionData'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const handleLogout = ({
    setIsLoggedIn,
    setIsSettingsExpanded,
}: handleLogoutProps) => {
    const parsedSessionData = getStoredSessionData()
    const parsedStorageData = getStoredData()

    for (const key in parsedSessionData) {
        setItemInSessionStorage(key, null)
    }
    for (const key in parsedStorageData) {
        setItemInStorage(key, null)
    }
    setIsSettingsExpanded(false)
    setIsLoggedIn(false)
}
