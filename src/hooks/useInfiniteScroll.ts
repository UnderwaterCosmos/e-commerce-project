import React from 'react';

interface IUseInfiniteScrollOptions {
  callback: () => void;
  triggerRef: React.MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
}: IUseInfiniteScrollOptions) {
  React.useEffect(() => {
    const triggerElem = triggerRef.current;
    let observer: IntersectionObserver | null = null;

    if (callback) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
      observer.observe(triggerElem);
    }

    return () => {
      if (observer && triggerElem) {
        observer.unobserve(triggerElem);
      }
    };
  }, [triggerRef, callback]);
}
