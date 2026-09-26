'use client';

import React, { useState } from 'react';
import { FileText, Stethoscope, Save, User, Calendar, Activity, CheckCircle2 } from 'lucide-react';

export default function EvolucionPage() {
  const [paciente, setPaciente] = useState('Gómez, Carlos (58 años - DNI 24.891.002)');
  const [subjetivo, setSubjetivo] = useState('Paciente refiere mejoría de dolor torácico tras inicio de nitratos y reposo. Niega disnea nocturna.');
  const [objetivo, setObjetivo] = useState('TA: 130/80 mmHg | FC: 74 lpm | FR: 16 rpm | SpO2: 98% aire ambiente. R1 y R2 normofonéticos, silencios libres. Murmullo vesicular conservado bilateral sin rales.');
  const [analisis, setAnalisis] = useState('Síndrome coronario agudo sin elevación de ST en estabilización clínica. Riesgo TIMI bajo-moderado.');
  const [plan, setPlan] = useState('1. Continuar AAS 100mg/d + Clopidogrel 75mg/d + Atorvastatina 40mg/noche.\n2. Solicitar enzimas cardíacas (Troponina I) de control a las 18:00 hs.\n3. Ecocardiograma Doppler transtorácico programado.');

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Registro Clínico SOAP
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Evolución Médica Diaria & Notas de Enfermería</h1>
          <p className="text-blue-100 text-sm mt-1">Estandarización internacional para pase de sala y seguimiento hospitalario</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Paciente Seleccionado</p>
              <p className="font-bold text-slate-900 text-base">{paciente}</p>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-600" /> Fecha: Hoy, 11:30 hs
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subjetivo */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-extrabold">S</span>
              Subjetivo (Relato del paciente / Anamnesis)
            </label>
            <textarea
              rows={4}
              value={subjetivo}
              onChange={e => setSubjetivo(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Objetivo */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-extrabold">O</span>
              Objetivo (Examen físico & Signos vitales)
            </label>
            <textarea
              rows={4}
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
            />
          </div>

          {/* Analisis */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">A</span>
              Análisis (Diagnóstico & Evaluación de respuesta)
            </label>
            <textarea
              rows={4}
              value={analisis}
              onChange={e => setAnalisis(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Plan */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-extrabold">P</span>
              Plan (Terapéutica, Estudios & Conducta)
            </label>
            <textarea
              rows={4}
              value={plan}
              onChange={e => setPlan(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {savedMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Evolución clínica guardada y firmada digitalmente con éxito.
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" /> Guardar y Firmar Evolución
          </button>
        </div>
      </form>
    </div>
  );
}
