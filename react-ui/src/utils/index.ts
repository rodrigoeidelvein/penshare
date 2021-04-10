export const setCookie = (name: string, value: string): void => {
    document.cookie = name + '=' + value + '; Path=/;';
}

export const deleteCookie = (name: string): void => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const cookieExists = (name: string): boolean => {
    return document.cookie.indexOf('token') >= 0;
}

export const arraysEquals = (a: [], b: []): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}