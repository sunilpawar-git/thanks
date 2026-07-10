class Confetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isActive = false;
    this.colors = ['#ff2a5f', '#ffd12a', '#2affd1', '#2a88ff', '#d12aff', '#a5ff2a', '#ff9f2a'];
    
    // Resize handler
    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  createParticle(side) {
    const isLeft = side === 'left';
    return {
      x: isLeft ? 0 : this.canvas.width,
      y: this.canvas.height * 0.8,
      vx: isLeft ? this.randomRange(8, 20) : this.randomRange(-20, -8),
      vy: this.randomRange(-15, -28),
      size: this.randomRange(6, 12),
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      rotation: this.randomRange(0, 360),
      rotationSpeed: this.randomRange(-10, 10),
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      opacity: 1
    };
  }

  blast(durationMs = 2000) {
    this.isActive = true;
    const endTime = Date.now() + durationMs;
    
    // Initial blast
    for (let i = 0; i < 75; i++) {
      this.particles.push(this.createParticle('left'));
      this.particles.push(this.createParticle('right'));
    }

    // Continuous spawn for a short duration
    const spawnInterval = setInterval(() => {
      if (Date.now() < endTime - 500) {
        for (let i = 0; i < 6; i++) {
          this.particles.push(this.createParticle('left'));
          this.particles.push(this.createParticle('right'));
        }
      } else {
        clearInterval(spawnInterval);
      }
    }, 100);

    if (!this.animationFrameId) {
      this.tick();
    }
  }

  tick() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.5; // Gravity
      p.vx *= 0.98; // Air resistance
      p.vy *= 0.98;
      p.rotation += p.rotationSpeed;

      // Fade out near the bottom or when out of viewport
      if (p.y > this.canvas.height * 0.75) {
        p.opacity -= 0.025;
      }

      if (p.opacity <= 0 || p.x < -20 || p.x > this.canvas.width + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrameId = requestAnimationFrame(() => this.tick());
    } else {
      this.animationFrameId = null;
      this.isActive = false;
    }
  }
}

// Attach to window for global access
window.ConfettiEngine = Confetti;
