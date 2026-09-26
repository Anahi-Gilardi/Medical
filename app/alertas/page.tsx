'use client';

import React from 'react';
import { AlertTriangle, Siren, Activity, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AlertasPage() {
  const alerts = [
    { id: 1, paciente: 'Carlos Méndez (58a)', tipo: 'Signos Vitales Críticos', detalle: 'Troponina I Cuantitativa elevada (0.45 ng/ml) + TA 160/95', nivel: 'Crítica', color: 'bg-red-500 text-white', hora: 'Hace 15 min' },
    { id: 2, paciente: 'Marta Solís (68a)', tipo: 'Alerta de Control Vencido', detalle: 'Paciente diabética tipo 2 sin control de HbA1c hace 120 días', nivel: 'Moderada', color: 'bg-amber-500 text-white', hora: 'Hace 2 horas' },
    { id: 3, paciente: 'Valeria Rossi (34a)', tipo: 'Alergia Medicamentosa', detalle: 'Alergia confirmada a Penicilinas en ficha clínica', nivel: 'Informativa', color: 'bg-blue-500 text-white', hora: 'Hace 4 horas' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Monitoreo y Seguridad del Paciente
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Alertas Médicas & Valores Críticos</h1>
          <p className="text-amber-100 text-sm mt-1">Detección de descompensaciones clínicas, alergias cruzadas y controles omitidos</p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${a.color}`}>{a.nivel}</span>
                <span className="font-bold text-slate-900 text-base">{a.paciente}</span>
                <span className="text-xs text-slate-400">({a.hora})</span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase">{a.tipo}</p>
              <p className="text-sm text-slate-700">{a.detalle}</p>
            </div>

            <button
              onClick={() => alert('Alerta atendida y registrada en auditoría.')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors shrink-0"
            >
              Marcar como Atendida
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
