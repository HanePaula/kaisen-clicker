import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const RatesBarChart = ({ autoclick, tickEfficiency }) => {
    const data = [
        { name: 'Giro IoT / Tick', valor: autoclick },
        { name: '% Risco Base Defeito', valor: tickEfficiency }
    ];
    
    const getColor = (name) => {
        if (name.includes('IoT')) return '#8b5cf6'; // Violet Tech
        if (name.includes('Defeito')) return '#ef4444'; // Error Red
        return '#0ea5e9'; // Analytics Blue
    };

    return (
        <section className="chart-wrapper" aria-label="Taxas e Configurações Ativas">
            <h3 className="dashboard-title-secondary">Instâncias de Produção Ocultas</h3>
            <div style={{ width: '100%', height: 320, marginTop: '20px' }}>
                <ResponsiveContainer>
                    <BarChart layout="vertical" data={data} margin={{ top: 0, right: 30, left: 15, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                        <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" width={110} stroke="#6b7280" tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                        
                        <Tooltip 
                            cursor={{ fill: 'rgba(0,0,0,0.02)' }} 
                            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} 
                        />
                        <Bar 
                            dataKey="valor" 
                            radius={[0, 6, 6, 0]} 
                            barSize={28} 
                            isAnimationActive={true}
                            animationDuration={1000}
                            activeBar={{ fillOpacity: 0.8 }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};
