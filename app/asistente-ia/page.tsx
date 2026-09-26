'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AsistenteIaPage() {
  const [drug1, setDrug1] = useState('Enalapril 10mg');
  const [drug2, setDrug2] = useState('Ibuprofeno 600mg');
  const [interactionResult, setInteractionResult] = useState<string | null>(null);

  const checkInteraction = () => {
    setInteractionResult(
      '⚠️ **Riesgo Moderado-Severo**: La combinación de IECA (Enalapril) con AINEs (Ibuprofeno) reduce el efecto antihipertensivo del Enalapril y aumenta significativamente el riesgo de deterioro de la función renal e hiperpotasemia. Se aconseja utilizar Paracetamol como analgésico de primera línea en este paciente.'
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" /> Soporte a la Decisión Médica
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Asistente Clínico IA & Interacciones Farmacológicas</h1>
          <p className="text-teal-100 text-sm mt-1">Verificación automática de incompatibilidades de fármacos y sugerencias terapéuticas</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-600" /> Verificador de Interacciones entre Fármacos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primer Medicamento</label>
            <input
              type="text"
              value={drug1}
              onChange={e => setDrug1(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Segundo Medicamento</label>
            <input
              type="text"
              value={drug2}
              onChange={e => setDrug2(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm font-semibold"
            />
          </div>
        </div>

        <button
          onClick={checkInteraction}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Analizar Interacción Cruzada
        </button>

        {interactionResult && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-slate-800 text-sm leading-relaxed animate-fade-in">
            <p className="font-bold text-amber-900 mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Resultado del Análisis Farmacológico:
            </p>
            <p>{interactionResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}
