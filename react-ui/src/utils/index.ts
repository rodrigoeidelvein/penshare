export const setCookie = (name: string, value: string): void => {
    document.cookie = name + '=' + value + '; Path=/;';
}

export const deleteCookie = (name: string): void => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}