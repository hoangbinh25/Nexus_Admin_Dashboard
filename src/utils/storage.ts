export const setStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
}

export const getStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;
        return JSON.parse(item);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const removeStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
}
