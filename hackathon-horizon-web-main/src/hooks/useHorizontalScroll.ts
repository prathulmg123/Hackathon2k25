import { useEffect } from 'react';

export const useHorizontalScroll = () => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const container = document.querySelector('.horizontal-scroll-container') as HTMLElement;
      if (container) {
        e.preventDefault();
        
        // Convert vertical scroll to horizontal with enhanced smoothness
        const scrollAmount = e.deltaY * 1.2; // Slightly amplify for better UX
        container.scrollBy({
          left: scrollAmount,
          behavior: 'auto' // Use auto for more responsive feel
        });
      }
    };

    // Handle trackpad horizontal swipes
    const handleTouchMove = (e: TouchEvent) => {
      const container = document.querySelector('.horizontal-scroll-container') as HTMLElement;
      if (container && e.touches.length === 2) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
};