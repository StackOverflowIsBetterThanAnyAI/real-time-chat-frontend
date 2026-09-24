export const getStoredSessionData = () => {
    if (typeof window !== 'undefined') {
        const storedData = sessionStorage.getItem('dieter-chat')
        return storedData ? JSON.parse(storedData) : {}
    }
}
