import {useEffect, useState} from 'react';

const useCookieStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        // Get value from cookies (can be replaced with localStorage if needed)
        const saved = document.cookie.split('; ').find(row => row.startsWith(key));
        return saved ? JSON.parse(saved.split('=')[1]) : initialValue;
    });

    useEffect(() => {
        // Set value to cookies whenever it changes
        document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
    }, [key, value]);

    return [value, setValue];
};

export default useCookieStorage;