import { handleLogoutProps } from '@/types'
import {
    getStoredData,
    getStoredSessionData,
    setItemInSessionStorage,
    setItemInStorage,
} from '@/utils'

export const handleLogout = ({
    setIsLoggedIn,
    setIsSettingsExpanded,
}: handleLogoutProps) => {
    const parsedSessionData = getStoredSessionData()
    const parsedStorageData = getStoredData()

    for (const key in parsedSessionData) {
        setItemInSessionStorage(key, null)
    }
    const dataUserName = parsedStorageData?.username
    for (const key in parsedStorageData) {
        setItemInStorage(key, null)
    }
    if (typeof dataUserName === 'string' && dataUserName) {
        setItemInStorage('username', dataUserName)
    }

    setIsSettingsExpanded(false)
    setIsLoggedIn(false)
}
