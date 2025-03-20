export const PLACEHOLDER_TITLE = 'Webtoon Title';
export const PLACEHOLDER_CHAPTER = 'Webtoon Chapter';

export const IMAGE_PATHS = {
	mosque: "/management/mosque.jpg",
	prayer: "/management/prayer_times.jpeg",
	donation: "/management/donation.jpg",
	inventory: "/management/inventory.jpg"
};

export const IMAGE_SOURCES = {
	ASURA: {
        extension: '.webp',
    },
    HIVETOON: {
        extension: '.jpg',
	}
};

export const getImageExtension = (source) => {
	const sourceDetails = IMAGE_SOURCES[source.toUpperCase()];
	if (!sourceDetails) throw new Error(`Unknown source: ${source}`);
	return sourceDetails.extension;
};