import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const UpgradesRadarChart = ({ distribution }) => {
    // Mapa de Labels bonitos e amigaveis pra Gestão Baseado na chave de identificacao
    const displayNames = {
        '5s': 'Org. 5S',
        'kanban': 'Gestão Kanban',
        'iot': 'Robótica (IoT)',
        'tpm': 'Manutenção TPM'
    };

    const data = Object.keys(distribution).map(key => ({
        subject: displayNames[key] || key,
        Aquisitions: distribution[key],
        fullMark: 10 // Ponto visual relativo pra manter aranha não quebrada
    }));

    return (
        <section className="chart-wrapper radar-container" aria-label="Estatística de Perfil Administrativo">
            <h3 className="dashboard-title-secondary">Foco do Gestor (Aquisições)</h3>
            <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                        <Radar 
                            name="Upgrades Adquiridos" 
                            dataKey="Aquisitions" 
                            stroke="#9A0B2C" 
                            fill="#9A0B2C" 
                            fillOpacity={0.4} 
                            
                            animationDuration={600}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} 
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};
