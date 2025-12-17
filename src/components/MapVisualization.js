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
        for (let i = 0; i < 50; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                active: Math.random() > 0.8
            });
        }

        const interval = setInterval(() => {
            // Randomly fluctuate active nodes for effect
            setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        }, 2000);

        let animationFrame;
        const render = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // trail effect
            ctx.fillRect(0, 0, width, height);

            // Draw grid
            ctx.strokeStyle = '#1a1a1a';
            ctx.lineWidth = 1;

            // Draw dots
            dots.forEach(dot => {
                dot.x += dot.vx;
                dot.y += dot.vy;

                if (dot.x < 0 || dot.x > width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > height) dot.vy *= -1;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.active ? 3 : 2, 0, Math.PI * 2);
                ctx.fillStyle = dot.active ? '#ff003c' : '#00ff41';
                ctx.fill();

                // Connect lines randomly
                dots.forEach(other => {
                    const dist = Math.hypot(dot.x - other.x, dot.y - other.y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 65, ${1 - dist / 100})`;
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
        <div className="panel" style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                <h3 className="text-neon" style={{ fontSize: '0.8rem' }}>GLOBAL INFECTION MAP</h3>
                <div className="mono" style={{ fontSize: '0.7rem', color: '#888' }}>
                    ACTIVE BEACONS: <span className="text-neon">{activeNodes}</span>
                </div>
            </div>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
