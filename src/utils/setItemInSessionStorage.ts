export const setItemInSessionStorage = (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
        const storage = sessionStorage.getItem('dieter-chat')
        const parsedTracker = storage ? JSON.parse(storage) : {}

        parsedTracker[key] = value
        sessionStorage.setItem('dieter-chat', JSON.stringify(parsedTracker))
    }
}
