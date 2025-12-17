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
        <div className="panel" style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="text-neon" style={{ fontSize: '0.9rem' }}>CONNECTED TARGETS</h3>
                <span className="mono text-dim" style={{ fontSize: '0.7rem' }}>TOTAL: {victims.length}</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #333', color: '#666' }}>
                        <th style={{ padding: '8px' }}>ID</th>
                        <th style={{ padding: '8px' }}>IP ADDRESS</th>
                        <th style={{ padding: '8px' }}>SYSTEM</th>
                        <th style={{ padding: '8px' }}>STATUS</th>
                        <th style={{ padding: '8px' }}>LATENCY</th>
                        <th style={{ padding: '8px' }}>ACTION</th>
                    </tr>
                </thead>
                <tbody className="mono">
                    {victims.map((v) => (
                        <tr key={v.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                            <td style={{ padding: '8px' }}>{v.id}</td>
                            <td style={{ padding: '8px', color: '#ccc' }}>{v.ip}</td>
                            <td style={{ padding: '8px' }}>{v.os}</td>
                            <td style={{ padding: '8px' }}>
                                <span className={v.status === 'ONLINE' || v.status === 'ACTIVE' ? 'text-neon' : v.status === 'OFFLINE' ? 'text-alert' : 'text-dim'}>
                                    {v.status}
                                </span>
                            </td>
                            <td style={{ padding: '8px' }}>{v.ping}</td>
                            <td style={{ padding: '8px' }}>
                                <button className="btn" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>CMD</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
