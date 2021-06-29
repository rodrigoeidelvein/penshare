import {Category, Pad} from "../interfaces";

export const setCookie = (name: string, value: string): void => {
    document.cookie = name + '=' + value + '; Path=/;';
}

export const deleteCookie = (name: string): void => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const cookieExists = (name: string): boolean => {
    return document.cookie.indexOf(name) >= 0;
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

export const formatDay = (day: number) => {
    return day < 10 ? `0${day}` : day;
}

export const formatDate = (date: string) => {
    const months: string[] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const dateObject: Date = new Date(date);
    return `${formatDay(dateObject.getDate())} de ${months[dateObject.getMonth()]} de ${dateObject.getFullYear()}`
}

export const editorConfig = {
    apiKey: process.env.REACT_APP_TINYMCE_API_KEY,
    init: {
        language: "pt_BR",
        language_url: "/langs/pt_BR.js",
        height: "700",
        menubar: false,
        toolbar: "undo redo | formatselect | bold italic underline backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat |",
    }
}

export const filterByCategory = (pad: Pad, categoriesSearch: Category[]) => {
    if (!categoriesSearch.length) {
        return pad;
    }

    const padCategories: number[] = pad.categories.map(category => category.id);
    const searchCategories: number[] = categoriesSearch.map((category: Category) => category.id);

    return searchCategories.every(id => padCategories.indexOf(id) >= 0);
}

export const filterByName = (pad: Pad, search: string) => {
    return pad.title?.toUpperCase().includes(search)
}