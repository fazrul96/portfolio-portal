import {IMAGE_PATHS} from "../constants/ImageConstants";
import {cacheImage, loadImageFromCache} from "@greda/common-utils/src/imageCache";

export const sectionsData = (t, navigate) => {
    const sectionConfig = [
        {
            image: IMAGE_PATHS.donation,
            titleKey: 'sections.donations.title',
            descriptionKey: 'sections.donations.description',
            buttonKey: 'sections.donations.button',
            onClick: () => navigate('/mosque/users'),
            type: 'card',
        },
        {
            image: IMAGE_PATHS.inventory,
            titleKey: 'sections.logistics.title',
            descriptionKey: 'sections.logistics.description',
            buttonKey: 'sections.logistics.button',
            onClick: () => navigate('/mosque/logistic'),
            type: 'card',
        },
        {
            image: IMAGE_PATHS.prayer,
            titleKey: 'sections.prayerTimes.title',
            descriptionKey: 'sections.prayerTimes.description',
            buttonKey: 'sections.prayerTimes.button',
            onClick: () => navigate('/mosque/prayerTimes'),
            type: 'card',
        },
        {
            titleKey: 'sections.sponsors.title',
            descriptionKey: 'sections.sponsors.description',
            buttonKey: 'sections.sponsors.button',
            onClick: () => alert(t('sections.sponsors.comingSoon')),
            type: 'paper',
        },
        {
            titleKey: 'sections.events.title',
            descriptionKey: 'sections.events.description',
            buttonKey: 'sections.events.button',
            onClick: () => alert(t('sections.events.comingSoon')),
            type: 'paper',
        },
        {
            titleKey: 'sections.announcements.title',
            descriptionKey: 'sections.announcements.description',
            buttonKey: 'sections.announcements.button',
            onClick: () => alert(t('sections.announcements.comingSoon')),
            type: 'paper',
        }
    ];

    return sectionConfig.map((section) => {
        const cachedImage = loadImageFromCache(section.image);

        const imageToUse = cachedImage || section.image;

        if (!cachedImage) {
            const image = new Image();
            image.src = section.image;
            image.onload = () => {
                cacheImage(section.image, image.src);
            };
        }

        return {
            image: imageToUse,
            title: t(section.titleKey),
            description: t(section.descriptionKey),
            buttonText: t(section.buttonKey),
            onClick: section.onClick,
            type: section.type
        };
    });
};