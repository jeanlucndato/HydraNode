'use client';

const victims = [
    { id: 'V-1024', ip: '192.168.1.104', os: 'Windows 10', status: 'ONLINE', ping: '12ms' },
    { id: 'V-3291', ip: '10.0.0.52', os: 'Windows Server 2019', status: 'ACTIVE', ping: '45ms' },
    { id: 'V-0021', ip: '172.16.89.2', os: 'Linux (Ubuntu)', status: 'SLEEP', ping: '---' },
    { id: 'V-8832', ip: '192.168.0.21', os: 'macOS Ventura', status: 'ONLINE', ping: '201ms' },
    { id: 'V-1111', ip: '203.0.113.88', os: 'Windows 11', status: 'OFFLINE', ping: '---' },
];

export default function VictimList() {
    return (
        <div className="panel" style={{ padding: '1.5rem', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="text-neon" style={{ fontSize: '1.2rem' }}>CONNECTED TARGETS</h3>
                <span className="mono text-dim" style={{ fontSize: '0.8rem', border: '1px solid #333', padding: '2px 8px' }}>
                    NODES: <span style={{ color: '#fff' }}>{victims.length}</span>
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                    <tr className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>IP ADDRESS</th>
                        <th style={{ padding: '8px' }}>SYSTEM</th>
                        <th style={{ padding: '8px' }}>STATUS</th>
                        <th style={{ padding: '8px' }}>PING</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>ACTION</th>
                    </tr>
                </thead>
                <tbody className="mono">
                    {victims.map((v) => (
                        <tr key={v.id} style={{ background: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 255, 65, 0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        >
                            <td style={{ padding: '10px', borderLeft: v.status === 'ONLINE' ? '2px solid var(--primary-color)' : '2px solid transparent' }}>
                                <span style={{ color: '#fff', fontWeight: 'bold' }}>{v.id}</span>
                            </td>
                            <td style={{ padding: '10px', color: '#888' }}>{v.ip}</td>
                            <td style={{ padding: '10px' }}>{v.os}</td>
                            <td style={{ padding: '10px' }}>
                                <span style={{
                                    color: v.status === 'ONLINE' || v.status === 'ACTIVE' ? 'var(--primary-color)' : v.status === 'OFFLINE' ? 'var(--alert-color)' : '#888',
                                    textShadow: (v.status === 'ONLINE' || v.status === 'ACTIVE') ? '0 0 5px var(--primary-color)' : 'none'
                                }}>
                                    {v.status === 'ONLINE' ? '● ONLINE' : v.status}
                                </span>
                            </td>
                            <td style={{ padding: '10px' }}>{v.ping}</td>
                            <td style={{ padding: '10px', textAlign: 'right' }}>
                                <button className="btn btn-sm">EXECUTE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
