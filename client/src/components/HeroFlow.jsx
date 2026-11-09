import { useEffect, useRef } from 'react';

const LABELS = ['Lead captured', 'Invoice sent', 'Follow-up queued', 'Order synced', 'Report ready', 'Task assigned', 'WhatsApp reply', 'Stock updated'];

// Live "automation network" drawn behind the hero: nodes drift, tasks (orange dots) travel between them.
export default function HeroFlow() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, visible = true, nodes = [], packets = [];
    const mouse = { x: -999, y: -999 };
    const D = 150;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(44, Math.max(16, (w * h) / 24000)));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: 2 + Math.random() * 2, pulse: 0, label: '', life: 0,
      }));
      packets = [];
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.pulse *= 0.94; n.life = Math.max(0, n.life - 0.008);
      }

      const near = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < D) {
            near.push([a, b]);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / D) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // cursor connects to nearby nodes
        const m = nodes[i], md = Math.hypot(m.x - mouse.x, m.y - mouse.y);
        if (md < 160) {
          ctx.strokeStyle = `rgba(249,115,22,${(1 - md / 160) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }

      if (!reduce && near.length && packets.length < 14 && Math.random() < 0.06) {
        const [a, b] = near[(Math.random() * near.length) | 0];
        packets.push(Math.random() > 0.5 ? { a, b, p: 0 } : { a: b, b: a, p: 0 });
      }

      for (const n of nodes) {
        ctx.fillStyle = n.pulse > 0.05 ? '#F97316' : 'rgba(255,255,255,.35)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.pulse * 3, 0, 6.283); ctx.fill();
        if (n.pulse > 0.05) {
          ctx.strokeStyle = `rgba(249,115,22,${n.pulse * 0.5})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, 6 + (1 - n.pulse) * 18, 0, 6.283); ctx.stroke();
        }
        if (n.life > 0) {
          ctx.font = '600 11px Manrope, system-ui, sans-serif';
          const tw = ctx.measureText(n.label).width + 16;
          ctx.globalAlpha = Math.min(1, n.life * 2);
          ctx.fillStyle = 'rgba(17,24,39,.85)';
          ctx.strokeStyle = 'rgba(249,115,22,.5)';
          ctx.beginPath(); ctx.roundRect(n.x + 10, n.y - 24, tw, 20, 10); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#FDBA74'; ctx.fillText(n.label, n.x + 18, n.y - 10);
          ctx.globalAlpha = 1;
        }
      }

      packets = packets.filter((k) => {
        k.p += 0.018;
        if (k.p >= 1) {
          k.b.pulse = 1;
          if (!k.b.life && nodes.filter((n) => n.life > 0).length < 3 && Math.random() < 0.5) {
            k.b.label = LABELS[(Math.random() * LABELS.length) | 0]; k.b.life = 1;
          }
          return false;
        }
        const x = k.a.x + (k.b.x - k.a.x) * k.p, y = k.a.y + (k.b.y - k.a.y) * k.p;
        ctx.shadowColor = '#F97316'; ctx.shadowBlur = 12; ctx.fillStyle = '#F97316';
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
        return true;
      });

      if (reduce) cancelAnimationFrame(raf);
    };

    const onMove = (e) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    const host = c.parentElement;

    init(); frame(); io.observe(c);
    host.addEventListener('mousemove', onMove); host.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      host.removeEventListener('mousemove', onMove); host.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
