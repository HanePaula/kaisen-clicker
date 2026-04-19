import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const FinancialBarChart = ({ totalEarned, currentLiquidity }) => {
    // Dados para o BarChart Simples Comparativo
    const data = [
        {
            name: 'Financeiro',
            'Receita Total': totalEarned,
            'Caixa Atual': currentLiquidity
        }
    ];

    // Renderizador customizado da Legenda para matar o desalinhamento padrão do Recharts
    const renderCustomLegend = (props) => {
        const { payload } = props;
        return (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: entry.color, borderRadius: '50%', marginRight: '8px', display: 'inline-block' }}></span>
                        <span style={{ color: entry.color, fontSize: '13px', fontWeight: 500 }}>{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section className="chart-wrapper financial-container" aria-label="Balanço Monetário">
            <h3 className="dashboard-title-secondary">Balanço (Ganhos vs Despesas)</h3>
            <div style={{ width: '100%', height: 320, marginTop: '0px' }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 15, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{ fill: 'rgba(0,0,0,0.02)' }} 
                            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} 
                        />
                        <Legend content={renderCustomLegend} verticalAlign="top" wrapperStyle={{ paddingBottom: '30px', display: 'flex', justifyContent: 'center' }} />
                        <Bar 
                            dataKey="Receita Total" 
                            fill="#0ea5e9" 
                            radius={[6, 6, 0, 0]} 
                            barSize={40} 
                            isAnimationActive={true}
                            animationDuration={1200} 
                            activeBar={{ stroke: '#0ea5e9', strokeWidth: 2, fillOpacity: 0.8 }}
                        />
                        <Bar 
                            dataKey="Caixa Atual" 
                            fill="#10b981" 
                            radius={[6, 6, 0, 0]} 
                            barSize={40} 
                            isAnimationActive={true}
                            animationDuration={1200} 
                            activeBar={{ stroke: '#10b981', strokeWidth: 2, fillOpacity: 0.8 }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};
