let currentController: AbortController | null = null

export const getAbortSignal = (): AbortSignal => {
    if (currentController) {
        currentController.abort()
    }

    currentController = new AbortController()
    return currentController.signal
}
