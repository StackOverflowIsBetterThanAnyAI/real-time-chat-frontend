import { StatisticsType } from '@/types'

export const checkIsStatisticsType = (
    item: unknown
): item is StatisticsType => {
    if (typeof item !== 'object' || item === null) {
        return false
    }

    if (
        !('totalSent' in item) ||
        !('totalReceived' in item) ||
        !('streak' in item) ||
        !('timeline' in item) ||
        !('favoriteFriend' in item)
    ) {
        return false
    }

    if (
        typeof item.totalSent !== 'number' ||
        typeof item.totalReceived !== 'number' ||
        typeof item.streak !== 'number' ||
        !Array.isArray(item.timeline)
    ) {
        return false
    }

    const isTimelineValid = item.timeline.every((t) => {
        return (
            typeof t === 'object' &&
            t !== null &&
            'dateOfMessage' in t &&
            typeof t.dateOfMessage === 'string' &&
            'sentCount' in t &&
            typeof t.sentCount === 'number' &&
            'receivedCount' in t &&
            typeof t.receivedCount === 'number'
        )
    })

    if (!isTimelineValid) {
        return false
    }

    const fav = item.favoriteFriend
    if (fav !== null) {
        if (typeof fav !== 'object') {
            return false
        }
        if (
            !('userName' in fav) ||
            typeof fav.userName !== 'string' ||
            fav.userName.length < 5 ||
            fav.userName.length > 20 ||
            !('messageCount' in fav) ||
            typeof fav.messageCount !== 'number' ||
            !('status' in fav) ||
            typeof fav.status !== 'string' ||
            fav.status.length > 255 ||
            !('profilePicture' in fav) ||
            typeof fav.profilePicture !== 'string'
        ) {
            return false
        }
    }

    return true
}
