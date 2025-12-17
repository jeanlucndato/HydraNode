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

        const msgs = [
            'Handshake completed [V-1024]',
            'Encrypted packet received (2kb)',
            'Heartbeat ignored from V-0021 [SLEEP_MODE]',
            'Scanning network interface (eth0)...',
            'Injecting payload into RAM segment 0x884...',
            'Task queue empty. Waiting for operator...',
            'Brute-force: Success (admin/admin)',
            'Keylogger: captured 402 keystrokes',
            'Screenshot uploaded: /tmp/screen_88.png'
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const newLog = {
                    ts: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    msg: msgs[Math.floor(Math.random() * msgs.length)],
                    type: Math.random() > 0.9 ? 'error' : Math.random() > 0.7 ? 'success' : 'info'
                };
                setLogs(prev => [...prev.slice(-15), newLog]);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.8)' }}>
            <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border-color)', background: '#020202', display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>SYSTEM LOGS // DECRYPTED STREAM</span>
                <span className="mono text-neon blink" style={{ fontSize: '0.75rem' }}>● LIVE</span>
            </div>
            <div className="mono" style={{ flex: 1, overflowY: 'auto', padding: '15px', fontSize: '0.8rem', lineHeight: '1.6', fontFamily: 'JetBrains Mono, monospace' }}>
                {logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '4px', wordBreak: 'break-all' }}>
                        <span style={{ color: '#444', marginRight: '12px' }}>[{log.ts}]</span>
                        <span style={{
                            color: log.type === 'error' ? 'var(--alert-color)' :
                                log.type === 'success' ? 'var(--primary-color)' : '#8c8c8c'
                        }}>
                            {log.type === 'error' ? <span style={{ color: 'var(--alert-color)' }}>[ERR] </span> :
                                log.type === 'success' ? <span style={{ color: 'var(--primary-color)' }}>[OK] </span> :
                                    <span style={{ color: '#666' }}>{'> '}</span>}
                            {log.msg}
                        </span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
}
