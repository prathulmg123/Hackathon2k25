import { useEffect, useRef } from 'react';

export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number>();

  // Scroll to a specific section
  const scrollToSection = (direction: 'prev' | 'next') => {
    const container = containerRef.current;
    if (!container || isScrolling.current) return;

    const sections = Array.from(container.children) as HTMLElement[];
    if (sections.length === 0) return;

    // Find the current section
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let currentIndex = 0;
    let minDistance = Infinity;

    // Find the section closest to the center
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.left + rect.width / 2;
      const distance = Math.abs(sectionCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });

    // Determine the target section
    let targetIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, sections.length - 1)
      : Math.max(currentIndex - 1, 0);

    // If we're already at the first/last section, don't scroll
    if (targetIndex === currentIndex) return;

    // Scroll to the target section
    const targetSection = sections[targetIndex];
    isScrolling.current = true;

    // Use smooth scroll behavior
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    // Set a timeout to prevent rapid firing
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = window.setTimeout(() => {
      isScrolling.current = false;
    }, 800); // Match this with your CSS transition duration
  };

  // Handle wheel event
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    
    // Only process one wheel event at a time
    if (isScrolling.current) return;
    
    // Determine scroll direction
    const delta = Math.sign(e.deltaY);
    scrollToSection(delta > 0 ? 'next' : 'prev');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToSection('next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToSection('prev');
    } else if (e.key === 'Home') {
      e.preventDefault();
      containerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      containerRef.current?.scrollTo({ 
        left: containerRef.current.scrollWidth, 
        behavior: 'smooth' 
      });
    }
  };

  useEffect(() => {
    // Get the container element
    containerRef.current = document.querySelector('.horizontal-scroll-container');
    const container = containerRef.current;
    
    if (!container) return;

    // Add CSS styles for smooth scrolling
    container.style.scrollBehavior = 'smooth';
    container.style.overflowX = 'auto';
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollPadding = '0 24px';
    
    // Add scroll-snap-align to all direct children
    Array.from(container.children).forEach(child => {
      (child as HTMLElement).style.scrollSnapAlign = 'start';
      (child as HTMLElement).style.scrollSnapStop = 'always';
    });

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      // Cleanup
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      
      // Reset styles
      container.style.scrollBehavior = '';
      container.style.overflowX = '';
      container.style.scrollSnapType = '';
      container.style.scrollPadding = '';
      
      Array.from(container.children).forEach(child => {
        (child as HTMLElement).style.scrollSnapAlign = '';
        (child as HTMLElement).style.scrollSnapStop = '';
      });
    };
  }, []);
};