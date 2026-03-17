import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Ensure data exists and is properly typed to avoid hydration or undefined errors
export const PlaceHolderImages: ImagePlaceholder[] = (data && Array.isArray(data.placeholderImages)) 
  ? data.placeholderImages 
  : [];