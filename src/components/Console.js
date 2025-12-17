'use client';
import { useEffect, useRef, useState } from 'react';

export default function Console() {
    const [logs, setLogs] = useState([
        { ts: '14:02:11', msg: 'System initialized. Listening on port 443...', type: 'info' },
        { ts: '14:02:15', msg: 'New beacon from 192.168.1.104', type: 'success' },
    ]);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });

        // Mock incoming logs
        const interval = setInterval(() => {
            const types = ['info', 'success', 'warning', 'error'];
            const msgs = [
                'Handshake completed [V-1024]',
                'Encrypted packet received (2kb)',
                'Heartbeat ignored from V-0021 (Sleep mode)',
                'Scanning network interface...',
                'Injecting payload into RAM...',
                'Task queue empty.'
            ];

            if (Math.random() > 0.7) {
                const newLog = {
                    ts: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    msg: msgs[Math.floor(Math.random() * msgs.length)],
                    type: Math.random() > 0.9 ? 'error' : 'info'
                };
                setLogs(prev => [...prev.slice(-10), newLog]); // keep last 10
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="panel" style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '5px 10px', borderBottom: '1px solid #333', background: '#111' }}>
                <span className="mono text-dim" style={{ fontSize: '0.7rem' }}>SYSTEM LOGS // DECRYPTED STREAM</span>
            </div>
            <div className="mono" style={{ flex: 1, overflowY: 'auto', padding: '10px', fontSize: '0.75rem', lineHeight: '1.4' }}>
                {logs.map((log, i) => (
                    <div key={i}>
                        <span style={{ color: '#555', marginRight: '10px' }}>[{log.ts}]</span>
                        <span style={{
                            color: log.type === 'error' ? 'var(--alert-color)' :
                                log.type === 'success' ? 'var(--primary-color)' : '#bbb'
                        }}>
                            {log.type === 'error' ? '[ERR] ' : log.type === 'success' ? '[OK] ' : '> '}
                            {log.msg}
                        </span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
}
