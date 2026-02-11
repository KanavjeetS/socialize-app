import React, { useEffect, useRef } from 'react';

interface GalaxyProps {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  starSpeed?: number;
  speed?: number;
}

const Galaxy: React.FC<GalaxyProps> = ({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1,
  glowIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
      }
    };

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      initialSize: number;
      color: string;
      speed: number;
      twinkleOffset: number;
      angle: number;
      radius: number;

      constructor() {
        // Initialize for a 3D tunnel/starfield effect
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        
        this.size = Math.random() * 1.5;
        this.initialSize = this.size;
        
        // Circular motion parameters
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.sqrt(this.x * this.x + this.y * this.y);

        this.speed = (Math.random() * 0.5 + 0.1) * starSpeed * speed;
        this.twinkleOffset = Math.random() * 100;
        
        // Color generation
        // Saturation 0 means grayscale (white/grey stars)
        // If saturation > 0, we use hueShift
        const h = hueShift + (Math.random() * 40 - 20);
        const s = saturation * 100; 
        const l = 70 + Math.random() * 30;
        this.color = `hsl(${h}, ${s}%, ${l}%)`;
      }

      update(time: number) {
        // Move closer (Z depth)
        this.z -= this.speed * 2;
        if (this.z <= 0) {
          this.z = width;
          this.x = (Math.random() - 0.5) * width;
          this.y = (Math.random() - 0.5) * height;
          this.radius = Math.sqrt(this.x * this.x + this.y * this.y);
        }

        // Apply Rotation
        this.angle += rotationSpeed * 0.01;
        this.x = Math.cos(this.angle) * this.radius;
        this.y = Math.sin(this.angle) * this.radius;

        // Mouse Repulsion
        if (mouseInteraction && mouseRepulsion) {
            // Project to 2D for interaction
            const perspective = width / 2;
            const scale = perspective / (perspective + this.z);
            const screenX = width / 2 + this.x * scale;
            const screenY = height / 2 + this.y * scale;

            const dx = screenX - mouseX;
            const dy = screenY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200) {
                const force = (200 - dist) / 200;
                // Push away
                const repulsionAngle = Math.atan2(dy, dx);
                this.x += Math.cos(repulsionAngle) * force * repulsionStrength * 2;
                this.y += Math.sin(repulsionAngle) * force * repulsionStrength * 2;
                
                // Recalculate radius/angle after push
                this.radius = Math.sqrt(this.x * this.x + this.y * this.y);
                this.angle = Math.atan2(this.y, this.x);
            }
        }

        // Twinkle
        if (twinkleIntensity > 0) {
            const twinkle = Math.sin(time * 0.005 + this.twinkleOffset) * twinkleIntensity;
            this.size = Math.max(0.1, this.initialSize + twinkle);
        }
      }

      draw() {
        const perspective = width / 2;
        const scale = perspective / (perspective + this.z);
        const screenX = width / 2 + this.x * scale;
        const screenY = height / 2 + this.y * scale;

        // Clipping
        if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) return;

        ctx!.beginPath();
        ctx!.fillStyle = this.color;
        
        // Glow
        if (glowIntensity > 0) {
            ctx!.shadowBlur = this.size * 10 * glowIntensity;
            ctx!.shadowColor = this.color;
        } else {
            ctx!.shadowBlur = 0;
        }
        
        const currentSize = this.size * scale;
        ctx!.arc(screenX, screenY, currentSize, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((width * height) / 4000 * density);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update(time);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resize();
    animate(0);

    // Event listeners
    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };
    
    if (mouseInteraction) {
        window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseRepulsion, mouseInteraction, density, glowIntensity, saturation, hueShift, twinkleIntensity, rotationSpeed, repulsionStrength, starSpeed, speed]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Galaxy;