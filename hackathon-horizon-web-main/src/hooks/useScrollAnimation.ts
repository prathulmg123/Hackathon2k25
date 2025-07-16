import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const animationType = element.dataset.animate;
              
              switch (animationType) {
                case 'fade-in':
                  element.classList.add('animate-fade-in');
                  break;
                case 'slide-up':
                  element.classList.add('animate-slide-up');
                  break;
                case 'scale-in':
                  element.classList.add('animate-scale-in');
                  break;
                case 'pulse-glow':
                  element.classList.add('animate-pulse-glow');
                  break;
                default:
                  element.classList.add('animate-fade-in');
              }
              
              // Unobserve after animation triggers
              observerRef.current?.unobserve(element);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
    }

    animateElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
};