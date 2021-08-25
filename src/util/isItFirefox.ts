const isitFirefox = (): boolean => {
    // Checks if the useragent is Firefox, because Firefox doesn't support backdrop-filter, such a headache
    return "InstallTrigger" in window
}

export default isitFirefox