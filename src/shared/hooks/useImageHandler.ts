import { SyntheticEvent, useRef } from 'react';
import type { ApplyStylesFunction, ImageLoadHandler, CheckImageFunction, UseImageHandler} from '@/types/types.tsx'

export const useImageHandler: () => UseImageHandler = (): UseImageHandler => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const applyStyles: ApplyStylesFunction = (
    img: HTMLImageElement
  ): void => {
    if (img.naturalHeight > img.naturalWidth * 1.5) {
      img.style.objectFit = "contain";
    }
  };

  const handleImageLoad: ImageLoadHandler = (
    e: SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    if (e.target instanceof HTMLImageElement) {
      const img: HTMLImageElement = e.target;
      applyStyles(img);
    }
  };

  const checkImage: CheckImageFunction = (
    img: HTMLImageElement
  ): void => {
    if (img.complete) {
      applyStyles(img);
    } else {
      img.onload = (): void => applyStyles(img);
    }
  };

  return {
    handleImageLoad,
    imgRef,
    checkImage
  };
};
