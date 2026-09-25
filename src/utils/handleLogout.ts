import { handleLogoutProps } from '@/types/types'
import { getStoredSessionData } from '@/utils/getStoredSessionData'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const handleLogout = ({
    setIsLoggedIn,
    setIsSettingsExpanded,
}: handleLogoutProps) => {
    const parsedSessionData = getStoredSessionData()

    for (const key in parsedSessionData) {
        setItemInSessionStorage(key, null)
    }
    setItemInStorage('isloggedin', false)
    setIsSettingsExpanded(false)
    setIsLoggedIn(false)
}
