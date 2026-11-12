import React, { useRef, useState, useEffect, useCallback } from 'react';

const CELLS = 17;
const SIZE = 340;
const CELL = SIZE / CELLS;

function rand() { return Math.floor(Math.random() * CELLS); }

function SnakeGame() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(localStorage.getItem('mp-snake-best') || '0', 10); } catch (e) { return 0; }
  });

  const game = useRef({
    snake: [{ x: 8, y: 8 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 12, y: 8 },
    acc: 0,
    last: 0,
  });

  const placeFood = useCallback(() => {
    const g = game.current;
    const occupied = new Set(g.snake.map((s) => `${s.x},${s.y}`));
    let f;
    do { f = { x: rand(), y: rand() }; } while (occupied.has(`${f.x},${f.y}`));
    g.food = f;
  }, []);

  const reset = useCallback(() => {
    game.current = {
      snake: [{ x: 8, y: 8 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 12, y: 8 },
      acc: 0,
      last: 0,
    };
    setScore(0);
    setOver(false);
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d');
    const g = game.current;
    ctx.clearRect(0, 0, SIZE, SIZE);
    // grid glow bg
    ctx.fillStyle = 'rgba(0,255,195,0.03)';
    for (let i = 0; i < CELLS; i++) {
      for (let j = 0; j < CELLS; j++) {
        if ((i + j) % 2 === 0) ctx.fillRect(i * CELL, j * CELL, CELL, CELL);
      }
    }
    // food
    ctx.fillStyle = '#b14eff';
    ctx.shadowColor = '#b14eff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(g.food.x * CELL + CELL / 2, g.food.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2);
    ctx.fill();
    // snake
    g.snake.forEach((s, i) => {
      const t = i / g.snake.length;
      ctx.fillStyle = i === 0 ? '#00ffc3' : `rgba(0,212,255,${0.9 - t * 0.5})`;
      ctx.shadowColor = '#00ffc3';
      ctx.shadowBlur = i === 0 ? 14 : 6;
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => { draw(); }, [draw]);

  // game loop
  useEffect(() => {
    if (!running) return;
    let raf;
    const STEP = 115;
    const loop = (now) => {
      const g = game.current;
      if (!g.last) g.last = now;
      g.acc += now - g.last;
      g.last = now;

      if (g.acc >= STEP) {
        g.acc = 0;
        // apply direction (prevent reversing)
        if (g.nextDir.x !== -g.dir.x || g.nextDir.y !== -g.dir.y) g.dir = g.nextDir;
        const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };

        if (head.x < 0 || head.x >= CELLS || head.y < 0 || head.y >= CELLS ||
            g.snake.some((s) => s.x === head.x && s.y === head.y)) {
          setRunning(false);
          setOver(true);
          setScore((sc) => {
            setBest((b) => {
              const nb = Math.max(b, sc);
              try { localStorage.setItem('mp-snake-best', String(nb)); } catch (e) { /* ignore */ }
              return nb;
            });
            return sc;
          });
          return;
        }

        g.snake.unshift(head);
        if (head.x === g.food.x && head.y === g.food.y) {
          setScore((s) => s + 1);
          placeFood();
        } else {
          g.snake.pop();
        }
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, draw, placeFood]);

  // controls
  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
      };
      if (map[e.key] && running) {
        e.preventDefault();
        game.current.nextDir = map[e.key];
      }
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [running]);

  const start = () => { reset(); setRunning(true); };
  const dpad = (d) => { if (running) game.current.nextDir = d; };

  return (
    <div className="mp-snake">
      <div className="mp-snake-hud">
        <span>score <b>{score}</b></span>
        <span>best <b>{best}</b></span>
      </div>
      <div className="mp-snake-stage">
        <canvas ref={canvasRef} width={SIZE} height={SIZE} className="mp-snake-canvas" />
        {(!running) && (
          <div className="mp-snake-overlay">
            <div className="mp-snake-msg">{over ? `Game over · ${score} pts` : 'Snake'}</div>
            <button className="mp-btn mp-btn-primary mp-btn-sm" onClick={start}>
              {over ? '↻ Play again' : '▶ Start'}
            </button>
            <div className="mp-snake-hint">Arrow keys / WASD — or use the pad</div>
          </div>
        )}
      </div>
      <div className="mp-snake-dpad">
        <button onClick={() => dpad({ x: 0, y: -1 })} aria-label="up"><i className="fas fa-caret-up" /></button>
        <div className="mp-snake-dpad-mid">
          <button onClick={() => dpad({ x: -1, y: 0 })} aria-label="left"><i className="fas fa-caret-left" /></button>
          <button onClick={() => dpad({ x: 1, y: 0 })} aria-label="right"><i className="fas fa-caret-right" /></button>
        </div>
        <button onClick={() => dpad({ x: 0, y: 1 })} aria-label="down"><i className="fas fa-caret-down" /></button>
      </div>
    </div>
  );
}

export default SnakeGame;
