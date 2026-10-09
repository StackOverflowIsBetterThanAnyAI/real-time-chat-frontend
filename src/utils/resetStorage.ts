import { resetStorageProps } from '@/types'
import {
    getStoredData,
    getStoredSessionData,
    setItemInSessionStorage,
    setItemInStorage,
} from '@/utils'

export const resetStorage = ({
    isDeleteAccount = false,
    setFriendsData,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
}: resetStorageProps) => {
    const parsedSessionData = getStoredSessionData()
    const parsedStorageData = getStoredData()

    for (const key in parsedSessionData) {
        setItemInSessionStorage(key, null)
    }
    const dataUserName = parsedStorageData?.username
    for (const key in parsedStorageData) {
        setItemInStorage(key, null)
    }
    if (typeof dataUserName === 'string' && dataUserName && !isDeleteAccount) {
        setItemInStorage('username', dataUserName)
    }

    setFriendsData(undefined)
    setIsLoggedIn(false)
    setIsSettingsExpanded(false)
    setUserData(undefined)
}
