'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

export default function EscalasPage() {
  const [activeScale, setActiveScale] = useState<'glasgow' | 'curb65' | 'barthel'>('glasgow');

  // Glasgow State
  const [ocular, setOcular] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motora, setMotora] = useState(6);
  const totalGlasgow = ocular + verbal + motora;
  const interpretacionGlasgow = totalGlasgow <= 8 ? 'Traumatismo Grave (Score <= 8: Asegurar Vía Aérea / IOT)' : totalGlasgow <= 12 ? 'Traumatismo Moderado' : 'Leve / Normal (13-15)';

  // CURB-65 State
  const [curbC, setCurbC] = useState(false);
  const [curbU, setCurbU] = useState(false);
  const [curbR, setCurbR] = useState(false);
  const [curbB, setCurbB] = useState(false);
  const [curb65, setCurb65] = useState(false);
  const totalCurb = (curbC ? 1 : 0) + (curbU ? 1 : 0) + (curbR ? 1 : 0) + (curbB ? 1 : 0) + (curb65 ? 1 : 0);
  const interpretacionCurb = totalCurb === 0 ? 'Bajo Riesgo (Tratamiento Ambulatorio)' : totalCurb <= 2 ? 'Riesgo Moderado (Considerar Internación en Sala General)' : 'Alto Riesgo (Criterio de UTI / Cuidados Críticos)';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Valoración Clínica Estandarizada
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Escalas de Valoración & Scores Clínicos</h1>
          <p className="text-blue-100 text-sm mt-1">Escala de Glasgow, CURB-65, Índice de Barthel y estratificación de riesgo</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2">
        <button
          onClick={() => setActiveScale('glasgow')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeScale === 'glasgow' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Escala de Coma de Glasgow
        </button>
        <button
          onClick={() => setActiveScale('curb65')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeScale === 'curb65' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          CURB-65 (Neumonía)
        </button>
      </div>

      {activeScale === 'glasgow' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-2 space-y-4 text-sm">
            {/* Ocular */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">1. Apertura Ocular</label>
              <select value={ocular} onChange={e => setOcular(+e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                <option value="4">4 - Espontánea</option>
                <option value="3">3 - Al estímulo verbal</option>
                <option value="2">2 - Al estímulo doloroso</option>
                <option value="1">1 - Nula / Sin respuesta</option>
              </select>
            </div>

            {/* Verbal */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">2. Respuesta Verbal</label>
              <select value={verbal} onChange={e => setVerbal(+e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                <option value="5">5 - Orientado y conversando</option>
                <option value="4">4 - Desorientado / Confuso</option>
                <option value="3">3 - Palabras inapropiadas</option>
                <option value="2">2 - Sonidos incomprensibles</option>
                <option value="1">1 - Nula / Sin respuesta</option>
              </select>
            </div>

            {/* Motora */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">3. Respuesta Motora</label>
              <select value={motora} onChange={e => setMotora(+e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                <option value="6">6 - Obedece órdenes</option>
                <option value="5">5 - Localiza el dolor</option>
                <option value="4">4 - Retirada al dolor / Flexión normal</option>
                <option value="3">3 - Flexión anormal (Decorticación)</option>
                <option value="2">2 - Extensión anormal (Descerebración)</option>
                <option value="1">1 - Nula / Flacidez</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase">Score Total Glasgow</p>
            <p className="text-5xl font-black text-teal-800">{totalGlasgow} <span className="text-base text-slate-500 font-bold">/ 15</span></p>
            <div className={`p-3 rounded-xl border text-xs font-bold ${
              totalGlasgow <= 8 ? 'bg-red-100 text-red-800 border-red-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}>
              {interpretacionGlasgow}
            </div>
          </div>
        </div>
      )}

      {activeScale === 'curb65' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-2 space-y-3 text-sm">
            <h3 className="font-bold text-slate-900 mb-2">Criterios CURB-65</h3>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbC} onChange={e => setCurbC(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>C</strong> - Confusión mental reciente</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbU} onChange={e => setCurbU(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>U</strong> - Urea sérica &gt; 7 mmol/L (BUN &gt; 19 mg/dL)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbR} onChange={e => setCurbR(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>R</strong> - Frecuencia Respiratoria &gt;= 30 rpm</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbB} onChange={e => setCurbB(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>B</strong> - Presión arterial baja (PAS &lt; 90 o PAD &lt;= 60 mmHg)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curb65} onChange={e => setCurb65(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>65</strong> - Edad &gt;= 65 años</span>
            </label>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase">Puntaje CURB-65</p>
            <p className="text-5xl font-black text-indigo-900">{totalCurb} <span className="text-base text-slate-500 font-bold">/ 5</span></p>
            <div className="p-3 rounded-xl border bg-indigo-50 border-indigo-200 text-indigo-900 text-xs font-bold">
              {interpretacionCurb}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
