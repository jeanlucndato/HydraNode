'use client';
import { useEffect, useRef, useState } from 'react';

export default function MapVisualization() {
    const canvasRef = useRef(null);
    const [activeNodes, setActiveNodes] = useState(128);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });

        const dots = [];
        for (let i = 0; i < 40; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                id: i,
                active: Math.random() > 0.6
            });
        }

        const interval = setInterval(() => {
            setActiveNodes(prev => Math.max(0, prev + (Math.random() > 0.5 ? Math.floor(Math.random() * 5) : -Math.floor(Math.random() * 3))));
        }, 1000);

        let animationFrame;
        const render = () => {
            // Trail effect with slight green tint
            ctx.fillStyle = 'rgba(5, 8, 6, 0.2)';
            ctx.fillRect(0, 0, width, height);

            // Draw world map grid reference (simulated)
            ctx.strokeStyle = '#1a2f1f';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x < width; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
            for (let y = 0; y < height; y += 50) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
            ctx.stroke();

            // Draw dots
            dots.forEach(dot => {
                dot.x += dot.vx;
                dot.y += dot.vy;

                if (dot.x < 0 || dot.x > width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > height) dot.vy *= -1;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.active ? 4 : 2, 0, Math.PI * 2);
                ctx.fillStyle = dot.active ? '#00ff41' : '#333';
                ctx.fill();

                if (dot.active) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00ff41';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                // Connect lines
                dots.forEach(other => {
                    const dist = Math.hypot(dot.x - other.x, dot.y - other.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 65, ${1 - dist / 120})`;
                        ctx.lineWidth = dot.active && other.active ? 1.5 : 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrame = requestAnimationFrame(render);
        };
        render();

        return () => {
            clearInterval(interval);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div className="panel" style={{ height: '350px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 15, left: 20, zIndex: 10, pointerEvents: 'none' }}>
                <h3 className="text-neon" style={{ fontSize: '1rem', marginBottom: '5px' }}>GLOBAL INFECTION MAP</h3>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    ACTIVE BEACONS: <span className="text-neon">{activeNodes}</span> / 5000
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 15, right: 20, zIndex: 10, pointerEvents: 'none', textAlign: 'right' }}>
                <div className="mono text-dim" style={{ fontSize: '0.65rem' }}>GRID: 54.333.12</div>
                <div className="mono text-dim" style={{ fontSize: '0.65rem' }}>SECURE CHANNEL</div>
            </div>

            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
