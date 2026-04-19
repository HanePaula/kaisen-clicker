import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const QualityPieChart = ({ totalProduced, defects }) => {
    // Calculo seguro barrando aversão de divisão em tela limpa
    const approved = Math.max(0, totalProduced - defects);
    
    // Dados Relativos Absolutos
    const data = [
        { name: 'Peças Aprovadas', value: approved },
        { name: 'Descartes Absolutos', value: defects }
    ];

    const COLORS = ['#10b981', '#ef4444']; // Emerald (Ok), Red (Fail)

    return (
        <section className="chart-wrapper" aria-label="Qualidade de Produção Diária">
            <h3 className="dashboard-title-secondary">Controle de Refugos</h3>
            <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={true}
                            animationDuration={1500}
                            animationBegin={0}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};
