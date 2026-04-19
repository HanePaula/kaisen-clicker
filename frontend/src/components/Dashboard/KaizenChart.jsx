import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, Line } from 'recharts';

/**
 * Smart Component: Encaixota lógica Premium para Recharts visando B.I.
 */
export const KaizenChart = ({ data }) => {
    return (
        <section className="chart-wrapper" aria-label="Painel de Desempenho Visual">
            <h3 className="dashboard-title-secondary">Performance Linear em Tempo Real</h3>
            <div className="chart-box">
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart
                        data={data}
                        margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9A0B2C" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#9A0B2C" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        
                        {/* Linha do Tempo e Eixos Discretos */}
                        <XAxis dataKey="time" stroke="#9ca3af" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="#9ca3af" tick={{fontSize: 12, fill: '#666'}} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#1a73e8" tick={{fontSize: 12}} domain={[0, 100]} axisLine={false} tickLine={false} />
                        
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                            cursor={{stroke: '#ccc', strokeWidth: 2}}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '10px' }}/>
                        
                        {/* Rendimento Financeiro Acumulado */}
                        <Area 
                            yAxisId="left" 
                            type="monotone" 
                            name="Geração de Caixa ($$)" 
                            dataKey="points" 
                            stroke="#9A0B2C" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorPoints)" 
                            
                            animationDuration={400} 
                            
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#9A0B2C' }}
                        />
                        
                        {/* Eficiência Máxima Absoluta (A parte mais legal de ver caindo nos Refugos) */}
                        <Line 
                            yAxisId="right" 
                            type="monotone" 
                            name="Eficiência (OEE %)" 
                            dataKey="efficiency" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            
                            animationDuration={400} 
                            
                            dot={false} 
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};
