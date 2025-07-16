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

interface Rocket {
  id: number;
  x: number;
  y: number;
  speed: number;
  angle: number;
  size: number;
  opacity: number;
  lastFlameTime: number;
  flameSize: number;
}

interface Spaceship {
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  vy: number;
  angle: number;
  color: string;
  isFast: boolean;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const spaceshipsRef = useRef<Spaceship[]>([]);
  const rocketIdRef = useRef<number>(0);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const lastShootingStarTime = useRef<number>(0);
  const shootingStarInterval = useRef<number>(1000); // Time between shooting star spawns
  const lastRocketTime = useRef<number>(0);
  const lastSpaceshipTime = useRef<number>(0);
  const spaceshipInterval = useRef<number>(200); // Time between spaceship spawns
  const rocketInterval = useRef<number>(3000); // Time between rocket groups
  const rocketGroupCount = useRef<number>(0); // Track how many rockets in current group
  const maxRocketsPerGroup = 1; // Number of rockets per group
  const timeBetweenRockets = 2000; // Time between rockets in a group (ms)

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

  const createRocket = useCallback((canvas: HTMLCanvasElement) => {
    const rocketId = rocketIdRef.current++;
    // Randomly choose which side the rocket will enter from
    const side = Math.floor(Math.random() * 4);
    let x, y, angle;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Set initial position and angle based on which side the rocket enters from
    switch (side) {
      case 0: // Top
        x = Math.random() * canvas.width;
        y = -50;
        // Calculate angle to center
        angle = Math.atan2(centerY - y, centerX - x) + Math.PI/2;
        break;
      case 1: // Right
        x = canvas.width + 50;
        y = Math.random() * canvas.height;
        // Calculate angle to center
        angle = Math.atan2(centerY - y, centerX - x) + Math.PI/2;
        break;
      case 2: // Bottom
        x = Math.random() * canvas.width;
        y = canvas.height + 50;
        // Calculate angle to center
        angle = Math.atan2(centerY - y, centerX - x) + Math.PI/2;
        break;
      case 3: // Left
        x = -50;
        y = Math.random() * canvas.height;
        // Calculate angle to center
        angle = Math.atan2(centerY - y, centerX - x) + Math.PI/2;
        break;
      default:
        x = 0;
        y = 0;
        angle = 0;
    }
    
    return {
      id: rocketId,
      x,
      y,
      speed: 3 + Math.random() * 2,
      angle,
      size: 3 + Math.random() * 2,
      opacity: 0.9 + Math.random() * 0.1,
      lastFlameTime: Date.now(),
      flameSize: 1
    };
  }, []);

  const drawRocket = useCallback((ctx: CanvasRenderingContext2D, rocket: Rocket) => {
    // Update flame animation
    const now = Date.now();
    if (now - rocket.lastFlameTime > 50) { // Change flame size every 50ms
      rocket.flameSize = 1 + Math.random() * 0.5; // Random flame size between 1-1.5
      rocket.lastFlameTime = now;
    }
    
    // Save context
    ctx.save();
    ctx.translate(rocket.x, rocket.y);
    ctx.rotate(rocket.angle);
    
    // Draw flame
    const flameLength = rocket.size * 3 * rocket.flameSize;
    ctx.beginPath();
    ctx.moveTo(-rocket.size, 0);
    ctx.lineTo(rocket.size, 0);
    ctx.lineTo(0, flameLength);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 165, 0, ${rocket.opacity * 0.7})`;
    ctx.fill();
    
    // Draw rocket body
    ctx.beginPath();
    ctx.arc(0, 0, rocket.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${rocket.opacity})`;
    ctx.fill();
    
    // Add a small glow
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(0, 0, rocket.size * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${rocket.opacity * 0.3})`;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Restore context
    ctx.restore();
  }, []);

  const createSpaceship = useCallback((canvas: HTMLCanvasElement) => {
    const size = 12 + Math.random() * 10; // Smaller size for streak effect
    const isFast = Math.random() > 0.7; // 30% chance to be a fast (red/orange) ship
    
    // Fast ships are red/orange, others are blue/cyan
    const colors = isFast 
      ? ['#ff3d00', '#ff6d00', '#ff9100'] 
      : ['#00b0ff', '#00e5ff', '#18ffff'];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Fast ships are 2-3x faster
    const baseSpeed = isFast ? 8 + Math.random() * 4 : 3 + Math.random() * 3;
    
    const side = Math.floor(Math.random() * 4);
    let x, y, angle, vx, vy;

    // Define entry point and velocity
    switch (side) {
      case 0: // Top
        x = Math.random() * canvas.width;
        y = -size;
        angle = Math.PI / 2 + (Math.random() * 0.4 - 0.2);
        vx = (Math.random() - 0.5) * 2 * baseSpeed * 0.2;
        vy = baseSpeed;
        break;
      case 1: // Right
        x = canvas.width + size;
        y = Math.random() * canvas.height;
        angle = Math.PI + (Math.random() * 0.4 - 0.2);
        vx = -baseSpeed;
        vy = (Math.random() - 0.5) * 2 * baseSpeed * 0.2;
        break;
      case 2: // Bottom
        x = Math.random() * canvas.width;
        y = canvas.height + size;
        angle = -Math.PI / 2 + (Math.random() * 0.4 - 0.2);
        vx = (Math.random() - 0.5) * 2 * baseSpeed * 0.2;
        vy = -baseSpeed;
        break;
      default: // Left
        x = -size;
        y = Math.random() * canvas.height;
        angle = 0 + (Math.random() * 0.4 - 0.2);
        vx = baseSpeed;
        vy = (Math.random() - 0.5) * 2 * baseSpeed * 0.2;
    }

    return {
      x,
      y,
      size,
      speed: baseSpeed,
      vx,
      vy,
      angle,
      color,
      isFast
    };
  }, []);

  const drawSpaceship = useCallback((ctx: CanvasRenderingContext2D, ship: Spaceship) => {
    ctx.save();
    
    // Create a glowing trail effect
    const gradient = ctx.createLinearGradient(
      ship.x - ship.vx * 2, 
      ship.y - ship.vy * 2,
      ship.x - ship.vx * 10, 
      ship.y - ship.vy * 10
    );
    
    // Adjust trail length based on speed
    const trailLength = ship.isFast ? 15 : 8;
    const opacity = ship.isFast ? 0.8 : 0.6;
    
    gradient.addColorStop(0, `${ship.color}00`);
    gradient.addColorStop(0.3, `${ship.color}${Math.floor(opacity * 50).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${ship.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
    
    // Draw the trail
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y);
    ctx.lineTo(ship.x - ship.vx * trailLength, ship.y - ship.vy * trailLength);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = ship.isFast ? 2.5 : 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw the main body (just a bright dot)
    const bodyGradient = ctx.createRadialGradient(
      ship.x, ship.y, 0,
      ship.x, ship.y, ship.size * 0.6
    );
    bodyGradient.addColorStop(0, ship.color);
    bodyGradient.addColorStop(1, `${ship.color}66`);
    
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.size * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = bodyGradient;
    ctx.fill();
    
    // Update position
    ship.x += ship.vx;
    ship.y += ship.vy;
    
    ctx.restore();
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

    // Create new rocket group if needed
    if (timestamp - lastRocketTime.current > rocketInterval.current) {
      if (rocketGroupCount.current < maxRocketsPerGroup) {
        // Add a new rocket to the current group
        rocketsRef.current.push(createRocket(canvas));
        rocketGroupCount.current++;
        // Schedule next rocket in the group
        lastRocketTime.current = timestamp;
        rocketInterval.current = timeBetweenRockets;
      } else {
        // Reset for next group
        rocketGroupCount.current = 0;
        lastRocketTime.current = timestamp;
        rocketInterval.current = 2000; // 2 seconds until next group
      }
    }
    
    // Create new spaceship if needed
    if (timestamp - lastSpaceshipTime.current > spaceshipInterval.current) {
      if (canvas) {
        spaceshipsRef.current.push(createSpaceship(canvas));
        lastSpaceshipTime.current = timestamp;
        // Random interval between 8-15 seconds for next spaceship
        spaceshipInterval.current = 8000 + Math.random() * 7000;
      }
    }
    
    // Update and draw all rockets
    rocketsRef.current = rocketsRef.current.filter(rocket => {
      // Move rocket
      rocket.x += Math.cos(rocket.angle - Math.PI/2) * rocket.speed;
      rocket.y += Math.sin(rocket.angle - Math.PI/2) * rocket.speed;
      
      // Draw rocket
      drawRocket(ctx, rocket);
      
      // Remove rocket if it's out of bounds
      const buffer = 100;
      return !(
        rocket.x < -buffer ||
        rocket.x > canvas.width + buffer ||
        rocket.y < -buffer ||
        rocket.y > canvas.height + buffer
      );
    });
    
    // Update and draw all spaceships
    spaceshipsRef.current = spaceshipsRef.current.filter(ship => {
      // Draw spaceship
      drawSpaceship(ctx, ship);
      
      // Remove if out of bounds with some buffer
      const buffer = 200; // Increased buffer to ensure smooth exit
      const outOfBounds = (
        ship.x < -buffer ||
        ship.x > canvas.width + buffer ||
        ship.y < -buffer ||
        ship.y > canvas.height + buffer
      );
      
      return !outOfBounds;
    });
    
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
  }, [createShootingStar, createRocket, drawRocket, createSpaceship, drawSpaceship]);

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