import {useEffect, useState} from 'react';

export const useImageCache = (imageUrl) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const cachedImage = localStorage.getItem(imageUrl);
        if (cachedImage) {
            setImageLoaded(true);
        } else {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                localStorage.setItem(imageUrl, 'loaded');
                setImageLoaded(true);
            };
        }
    }, [imageUrl]);

    return imageLoaded;
};
