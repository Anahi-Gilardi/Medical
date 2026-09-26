'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, Activity, Droplets, Scale, Heart, AlertCircle, RefreshCw } from 'lucide-react';

export default function CalculadoraPage() {
  const [activeTab, setActiveTab] = useState<'cockcroft' | 'bsa' | 'dosis' | 'bic' | 'sodio'>('cockcroft');

  // 1. Cockcroft-Gault
  const [cgAge, setCgAge] = useState(65);
  const [cgWeight, setCgWeight] = useState(72);
  const [cgCreat, setCgCreat] = useState(1.3);
  const [cgSex, setCgSex] = useState<'M' | 'F'>('M');
  const factorSexo = cgSex === 'F' ? 0.85 : 1.0;
  const clearance = +(((140 - cgAge) * cgWeight) / (72 * cgCreat) * factorSexo).toFixed(1);

  // 2. BSA (Mosteller)
  const [bsaWeight, setBsaWeight] = useState(75);
  const [bsaHeight, setBsaHeight] = useState(175);
  const bsa = +(Math.sqrt((bsaWeight * bsaHeight) / 3600)).toFixed(2);

  // 3. Dosis Pediatrica
  const [pedWeight, setPedWeight] = useState(14);
  const [pedDoseKg, setPedDoseKg] = useState(50); // mg/kg/dia
  const [pedConc, setPedConc] = useState(50); // mg/ml (ej: 250mg/5ml = 50mg/ml)
  const [pedTomas, setPedTomas] = useState(3);
  const totalMgDia = pedWeight * pedDoseKg;
  const mlPorToma = +((totalMgDia / pedTomas) / pedConc).toFixed(1);

  // 4. BIC
  const [bicVol, setBicVol] = useState(500); // ml
  const [bicHours, setBicHours] = useState(8); // horas
  const mlHora = +(bicVol / bicHours).toFixed(1);
  const macroGotas = +(bicVol / (bicHours * 3)).toFixed(1);
  const microGotas = +(bicVol / bicHours).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Fórmulas Médicas & Dosificación
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Calculadora Clínica & Infusiones</h1>
          <p className="text-teal-100 text-sm mt-1">Clearance de creatinina, superficie corporal, goteo BIC y dosificación por peso</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cockcroft')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'cockcroft' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Clearance Creatinina (Cockcroft)
        </button>
        <button
          onClick={() => setActiveTab('bsa')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'bsa' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Superficie Corporal (Mosteller)
        </button>
        <button
          onClick={() => setActiveTab('dosis')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'dosis' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Dosis Pediátrica (mg/kg/día)
        </button>
        <button
          onClick={() => setActiveTab('bic')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'bic' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Bomba de Infusión (BIC / Goteo)
        </button>
      </div>

      {/* Tab 1: Cockcroft */}
      {activeTab === 'cockcroft' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Parámetros del Paciente</h3>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Sexo</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCgSex('M')}
                  className={`py-2 rounded-xl border font-bold text-center ${cgSex === 'M' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700'}`}
                >
                  Hombre (x1.00)
                </button>
                <button
                  type="button"
                  onClick={() => setCgSex('F')}
                  className={`py-2 rounded-xl border font-bold text-center ${cgSex === 'F' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700'}`}
                >
                  Mujer (x0.85)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Edad (años)</label>
                <input type="number" value={cgAge} onChange={e => setCgAge(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peso (kg)</label>
                <input type="number" value={cgWeight} onChange={e => setCgWeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Creatinina (mg/dl)</label>
                <input type="number" step="0.1" value={cgCreat} onChange={e => setCgCreat(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="bg-teal-50/70 p-6 rounded-2xl border border-teal-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Depuración de Creatinina Estimada</p>
            <p className="text-5xl font-black text-teal-900">{clearance} <span className="text-lg font-bold text-teal-700">ml/min</span></p>
            <div className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-teal-200 text-teal-800">
              {clearance >= 90 ? 'Función Renal Normal (Estadio G1)' : clearance >= 60 ? 'Leve disminución (Estadio G2)' : clearance >= 30 ? 'Disminución Moderada (Estadio G3)' : 'Insuficiencia Renal Severa (Estadio G4/G5)'}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: BSA */}
      {activeTab === 'bsa' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Parámetros Antropométricos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peso (kg)</label>
                <input type="number" value={bsaWeight} onChange={e => setBsaWeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Altura (cm)</label>
                <input type="number" value={bsaHeight} onChange={e => setBsaHeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/70 p-6 rounded-2xl border border-indigo-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Superficie Corporal (Mosteller)</p>
            <p className="text-5xl font-black text-indigo-900">{bsa} <span className="text-lg font-bold text-indigo-700">m²</span></p>
            <p className="text-xs text-indigo-600 font-medium">Útil para quimioterapia, dosis de fármacos específicos y hemodinamia.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Dosis Pediatrica */}
      {activeTab === 'dosis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Cálculo de Dosis por Peso</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peso (kg)</label>
                <input type="number" value={pedWeight} onChange={e => setPedWeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Dosis (mg/kg/día)</label>
                <input type="number" value={pedDoseKg} onChange={e => setPedDoseKg(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Conc. Jarabe (mg/ml)</label>
                <input type="number" value={pedConc} onChange={e => setPedConc(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Tomas por día</label>
                <select value={pedTomas} onChange={e => setPedTomas(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold">
                  <option value="1">1 vez al día (c/24h)</option>
                  <option value="2">2 veces al día (c/12h)</option>
                  <option value="3">3 veces al día (c/8h)</option>
                  <option value="4">4 veces al día (c/6h)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/70 p-6 rounded-2xl border border-purple-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Volumen a Administrar por Toma</p>
            <p className="text-5xl font-black text-purple-900">{mlPorToma} <span className="text-lg font-bold text-purple-700">ml</span></p>
            <p className="text-xs text-purple-700 font-semibold">Total diario: {totalMgDia} mg/día ({+(totalMgDia / pedConc).toFixed(1)} ml/día)</p>
          </div>
        </div>
      )}

      {/* Tab 4: BIC */}
      {activeTab === 'bic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Parámetros de Infusión</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Volumen Total (ml)</label>
                <input type="number" value={bicVol} onChange={e => setBicVol(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Tiempo de Pasaje (Horas)</label>
                <input type="number" value={bicHours} onChange={e => setBicHours(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="bg-cyan-50/70 p-6 rounded-2xl border border-cyan-200 flex flex-col justify-center space-y-3">
            <div className="text-center">
              <p className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Bomba de Infusión Continua (BIC)</p>
              <p className="text-4xl font-black text-cyan-900">{mlHora} <span className="text-base font-bold text-cyan-700">ml/hora</span></p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-200 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-cyan-100">
                <p className="font-bold text-slate-500">Macrogotas/min</p>
                <p className="text-base font-bold text-cyan-900">{macroGotas} gts/min</p>
              </div>
              <div className="bg-white p-2 rounded-lg border border-cyan-100">
                <p className="font-bold text-slate-500">Microgotas/min</p>
                <p className="text-base font-bold text-cyan-900">{microGotas} microgts/min</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
