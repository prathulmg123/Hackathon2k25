import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize stars with more variety
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 300; i++) {
        const size = Math.random();
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size < 0.7 ? Math.random() * 1.5 + 0.3 : Math.random() * 3 + 2, // Mix of small and large stars
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
        });
      }
    };

    // Initialize shooting stars
    const initShootingStars = () => {
      shootingStarsRef.current = [];
    };

    // Create shooting star with better frequency
    const createShootingStar = () => {
      if (Math.random() < 0.008) { // Slightly higher probability
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width + 100, // Start slightly off-screen
          y: Math.random() * canvas.height * 0.6, // Cover more vertical area
          length: Math.random() * 120 + 60, // Longer trails
          speed: Math.random() * 4 + 3, // Faster movement
          angle: Math.random() * Math.PI / 3 + Math.PI / 6, // 30-90 degrees for variety
          opacity: 1,
        });
      }
    };

    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with enhanced twinkling
      starsRef.current.forEach((star) => {
        ctx.save();
        
        // Enhanced twinkling with varying intensity
        const twinkle = Math.sin(Date.now() * star.twinkleSpeed) * 0.15;
        star.opacity = Math.max(0.1, Math.min(0.95, star.opacity + twinkle));
        
        ctx.globalAlpha = star.opacity;
        
        // Vary colors slightly for depth
        const hue = 220 + Math.sin(Date.now() * star.twinkleSpeed * 0.5) * 10;
        const lightness = star.size > 2 ? 95 : 90; // Larger stars are brighter
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect for larger stars
        if (star.size > 2) {
          ctx.shadowBlur = star.size * 2;
          ctx.shadowColor = `hsl(${hue}, 100%, 90%)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.restore();
      });

      // Create new shooting stars
      createShootingStar();

      // Draw and animate shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((shootingStar) => {
        const startX = shootingStar.x;
        const startY = shootingStar.y;
        const endX = startX - Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = startY - Math.sin(shootingStar.angle) * shootingStar.length;

        // Create gradient for shooting star trail
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `hsla(220, 100%, 90%, ${shootingStar.opacity})`);
        gradient.addColorStop(1, 'hsla(220, 100%, 90%, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Move shooting star
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.015;

        return shootingStar.opacity > 0 && shootingStar.x < canvas.width + 100;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    initShootingStars();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarField;