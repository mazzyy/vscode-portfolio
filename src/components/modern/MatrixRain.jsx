import React, { useEffect, useRef } from 'react';

function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const chars = 'アイウエオカキクケコｱｲｳ01<>{}[]/#$%&*+=musawar'.split('');
    const fontSize = 16;
    let columns = Math.floor(w / fontSize);
    let drops = Array(columns).fill(1);
    let raf;

    const accent = getComputedStyle(document.querySelector('.modern-root') || document.body)
      .getPropertyValue('--mp-accent').trim() || '#00ffc3';

    const draw = () => {
      ctx.fillStyle = 'rgba(5,8,13,0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = accent;
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      columns = Math.floor(w / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', onResize);

    const timer = setTimeout(onClose, 9000);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); clearTimeout(timer); };
  }, [onClose]);

  return (
    <div className="mp-matrix" onClick={onClose}>
      <canvas ref={canvasRef} />
      <div className="mp-matrix-hint">click to exit the matrix</div>
    </div>
  );
}

export default MatrixRain;
