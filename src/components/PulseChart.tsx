import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { time: '00:00', value: 124.5 },
  { time: '04:00', value: 125.2 },
  { time: '08:00', value: 124.8 },
  { time: '12:00', value: 126.1 },
  { time: '16:00', value: 125.7 },
  { time: '20:00', value: 126.5 },
  { time: '24:00', value: 127.2 },
];

export default function PulseChart() {
  return (
    <div className="w-full h-full relative group">
      <div className="absolute top-0 right-0 p-4 z-20">
         <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-gold/20">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span className="text-[8px] font-mono text-gold tracking-widest uppercase">Quantum Pulse Active</span>
         </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="eliteGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
               <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
               <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            hide 
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
          />
          <Tooltip 
            cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 15, 0.95)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.3)', 
              borderRadius: '12px',
              fontSize: '10px',
              fontFamily: 'JetBrains Mono, monospace',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
            itemStyle={{ color: '#D4AF37' }}
            labelClassName="text-pearl/40 mb-1"
          />
          <Area 
            type="stepAfter" 
            dataKey="value" 
            stroke="#D4AF37" 
            fillOpacity={1} 
            fill="url(#eliteGradient)" 
            strokeWidth={1}
            filter="url(#glow)"
            animationDuration={2000}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
