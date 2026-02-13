export function launchConfetti({count = 80, colors} = {}) {
  colors = colors || ['#ff69b4', '#ff1493', '#ffb6c1', '#fff176', '#8bc34a'];
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    ctx.scale(DPR, DPR);
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 6,
      vy: 1 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * Math.PI,
      tiltSpeed: (Math.random() - 0.5) * 0.2,
      life: 0,
      ttl: 480 + Math.random() * 360,
    });
  }

  let rafId;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.tilt += p.tiltSpeed;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    const alive = particles.some(p => p.life < p.ttl && p.y < window.innerHeight + 50);
    if (alive) rafId = requestAnimationFrame(draw);
    else cleanup();
  }

  function cleanup() {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  }

  rafId = requestAnimationFrame(draw);
  setTimeout(cleanup, 12000);
}

export default launchConfetti;
