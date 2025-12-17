'use client';
import Console from './Console';
import MapVisualization from './MapVisualization';
import VictimList from './VictimList';

export default function Dashboard() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '10px', gap: '15px' }}>

            {/* Header */}
            <header className="panel" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <h1 className="text-neon glitch" style={{ fontSize: '2rem', letterSpacing: '6px' }}>VIBEWARE</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span className="mono" style={{ background: 'var(--alert-color)', color: '#000', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            OFFENSIVE MODE
                        </span>
                        <span className="mono" style={{ border: '1px solid var(--primary-color)', color: 'var(--primary-color)', padding: '3px 8px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            v2.4.0-RC
                        </span>
                    </div>
                </div>
                <div className="mono text-dim" style={{ fontSize: '0.9rem', display: 'flex', gap: '20px' }}>
                    <span>C2 SERVER: <span style={{ color: 'var(--primary-color)' }}>ONLINE</span></span>
                    <span>ENCRYPTION: <span style={{ color: 'var(--primary-color)' }}>AES-256</span></span>
                    <span>LATENCY: <span className="text-neon blink">24ms</span></span>
                </div>
            </header>

            {/* Main Grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2.5fr', gap: '15px', minHeight: 0 }}>

                {/* Left Column: List */}
                <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                    <VictimList />
                </div>

                {/* Right Column: Map & Console */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', minHeight: 0 }}>
                    <MapVisualization />
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Console />
                    </div>
                </div>
            </div>
        </div>
    );
}
