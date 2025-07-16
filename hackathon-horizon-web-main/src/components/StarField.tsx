import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  size: number;
  trail: { x: number; y: number }[];
  maxTrail: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const lastShootingStarTime = useRef<number>(0);
  const shootingStarInterval = useRef<number>(1000); // Time between shooting star spawns

  const initStars = useCallback((canvas: HTMLCanvasElement) => {
    const stars: Star[] = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 3000); // Adjust density based on screen size
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random();
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size < 0.9 ? Math.random() * 1.2 + 0.3 : Math.random() * 2 + 1.5, // Mostly small stars with few larger ones
        opacity: Math.random() * 0.6 + 0.1, // More subtle opacity
        twinkleSpeed: Math.random() * 0.02 + 0.003, // Slower twinkling
        speed: Math.random() * 0.2 + 0.01, // Parallax effect speed
      });
    }
    starsRef.current = stars;
  }, []);

  const createShootingStar = useCallback((canvas: HTMLCanvasElement) => {
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y, angle, angleVariance;
    
    // Randomly choose between long and short shooting stars (20% chance for long ones)
    const isLong = Math.random() > 0.8;
    
    // Define base angles for each edge (in radians)
    switch (edge) {
      case 0: // Top edge
        x = Math.random() * canvas.width;
        y = -20;
        angleVariance = isLong ? (Math.PI / 6) : (Math.PI / 3) * (Math.random() * 0.8 + 0.2);
        angle = Math.PI * 0.5 + (Math.random() * angleVariance - angleVariance / 2);
        break;
      case 1: // Right edge
        x = canvas.width + 20;
        y = Math.random() * canvas.height;
        angleVariance = isLong ? (Math.PI / 6) : (Math.PI / 3) * (Math.random() * 0.8 + 0.2);
        angle = Math.PI + (Math.random() * angleVariance - angleVariance / 2);
        break;
      case 2: // Bottom edge
        x = Math.random() * canvas.width;
        y = canvas.height + 20;
        angleVariance = isLong ? (Math.PI / 6) : (Math.PI / 3) * (Math.random() * 0.8 + 0.2);
        angle = Math.PI * 1.5 + (Math.random() * angleVariance - angleVariance / 2);
        break;
      case 3: // Left edge
        x = -20;
        y = Math.random() * canvas.height;
        angleVariance = isLong ? (Math.PI / 6) : (Math.PI / 3) * (Math.random() * 0.8 + 0.2);
        angle = 0 + (Math.random() * angleVariance - angleVariance / 2);
        break;
      default:
        x = 0;
        y = 0;
        angle = 0;
    }
    
    // Define star properties based on whether it's a long or short shooting star
    const length = isLong ? 
      Math.random() * 150 + 100 :  // Long stars: 100-250px
      Math.random() * 40 + 20;     // Short stars: 20-60px
      
    const speed = isLong ?
      Math.random() * 1.5 + 1.5 :  // Slower for long stars
      Math.random() * 2 + 2;       // Faster for short stars
      
    const size = isLong ?
      Math.random() * 0.8 + 0.7 :  // Thinner for long stars
      Math.random() * 1.2 + 0.5;   // Thicker for short stars
    
    shootingStarsRef.current.push({
      x,
      y,
      length,
      speed,
      angle,
      opacity: isLong ? 0.6 + Math.random() * 0.3 : 0.8 + Math.random() * 0.2,
      size,
      trail: [],
      maxTrail: isLong ? 15 : 8,  // Longer trail for long stars
    });
  }, []);

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const deltaTime = timestamp - (lastTimeRef.current || timestamp);
    lastTimeRef.current = timestamp;

    // Clear with a slight fade effect for motion blur
    ctx.fillStyle = 'rgba(8, 8, 20, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars with parallax effect
    starsRef.current.forEach((star) => {
      // Update star position for parallax effect
      star.x -= star.speed * (deltaTime / 16);
      if (star.x < -10) star.x = canvas.width + 10;
      
      // Twinkling effect
      const twinkle = Math.sin(timestamp * star.twinkleSpeed) * 0.1;
      const opacity = Math.max(0.1, Math.min(0.8, star.opacity + twinkle));
      
      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      
      // Larger stars are brighter and have a slight blue tint
      if (star.size > 1.5) {
        const hue = 220 + Math.sin(timestamp * 0.001) * 5;
        ctx.fillStyle = `hsla(${hue}, 80%, 90%, ${opacity})`;
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = `hsla(${hue}, 80%, 85%, ${opacity * 0.8})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Maintain at least 3 shooting stars
    if (shootingStarsRef.current.length < 3 && 
        timestamp - lastShootingStarTime.current > shootingStarInterval.current) {
      createShootingStar(canvas);
      lastShootingStarTime.current = timestamp;
      // Randomize interval for next shooting star
      shootingStarInterval.current = 500 + Math.random() * 1500;
    }

    // Update and draw shooting stars
    shootingStarsRef.current = shootingStarsRef.current.filter(star => {
      // Update position
      star.x -= Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      
      // Add current position to trail
      star.trail.push({ x: star.x, y: star.y });
      if (star.trail.length > star.maxTrail) {
        star.trail.shift();
      }
      
      // Draw trail
      ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.lineWidth = star.size;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      
      // Draw a smooth curve through the trail points
      for (let i = 0; i < star.trail.length - 1; i++) {
        const xc = (star.trail[i].x + star.trail[i + 1].x) / 2;
        const yc = (star.trail[i].y + star.trail[i + 1].y) / 2;
        ctx.quadraticCurveTo(star.trail[i].x, star.trail[i].y, xc, yc);
      }
      ctx.stroke();
      
      // Draw head
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Check if out of bounds
      const buffer = 100; // Buffer area outside canvas
      return (
        star.x > -buffer &&
        star.x < canvas.width + buffer &&
        star.y > -buffer &&
        star.y < canvas.height + buffer
      );
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [createShootingStar]);

  // Handle window resize and initial setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas);
    };
    
    resizeCanvas();
    
    animationRef.current = requestAnimationFrame(animate);
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default StarField;