'use client';
import Console from './Console';
import MapVisualization from './MapVisualization';
import VictimList from './VictimList';

export default function Dashboard() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px' }}>

            {/* Header */}
            <header className="panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 className="text-neon" style={{ fontSize: '1.5rem', letterSpacing: '4px' }}>VIBEWARE</h1>
                    <span className="mono" style={{ background: 'var(--alert-color)', color: '#000', padding: '2px 6px', fontSize: '0.6rem', fontWeight: 'bold' }}>
                        OFFENSIVE MODE
                    </span>
                </div>
                <div className="mono text-dim" style={{ fontSize: '0.8rem' }}>
                    C2 SERVER: <span style={{ color: '#fff' }}>ONLINE</span> | LATENCY: <span className="text-neon">24ms</span>
                </div>
            </header>

            {/* Main Grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '10px', minHeight: 0 }}>

                {/* Left Column: List */}
                <div style={{ minHeight: 0 }}>
                    <VictimList />
                </div>

                {/* Right Column: Map & Console */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0 }}>
                    <MapVisualization />
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Console />
                    </div>
                </div>
            </div>
        </div>
    );
}
