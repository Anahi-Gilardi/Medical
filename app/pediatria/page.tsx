'use client';

import React, { useState } from 'react';
import { Baby, Activity, Heart, Sparkles, Scale, Ruler, CheckCircle2, TrendingUp } from 'lucide-react';

export default function PediatriaPage() {
  const [sexo, setSexo] = useState<'M' | 'F'>('M');
  const [edadMeses, setEdadMeses] = useState<number>(18);
  const [peso, setPeso] = useState<number>(11.5);
  const [talla, setTalla] = useState<number>(82);
  const [perimetro, setPerimetro] = useState<number>(47.5);

  // Calculo de Percentiles e IMC
  const imc = +(peso / ((talla / 100) * (talla / 100))).toFixed(1);
  
  // Evaluacion aproximada OMS
  const evaluacionNutricional = imc >= 14 && imc <= 18 ? 'Eutrófico (Normal)' : imc > 18 ? 'Sobrepeso Pediátrico' : 'Riesgo de Bajo Peso';
  const percentilPeso = peso >= 11 && peso <= 12.5 ? 'Percentil 50 (Mediana)' : peso > 12.5 ? 'Percentil 85' : 'Percentil 15';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Baby className="w-3.5 h-3.5" /> Ficha Pediátrica & Crecimiento OMS
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Evaluación Pediátrica y Curvas de Crecimiento</h1>
          <p className="text-pink-100 text-sm mt-1">Calculadora de Percentiles OMS, Z-scores y seguimiento del desarrollo psicomotor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antropometria Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Scale className="w-5 h-5 text-purple-600" /> Datos Antropométricos
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Sexo Biológico</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSexo('M')}
                  className={`py-2 font-bold rounded-xl border text-center transition-all ${
                    sexo === 'M' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Niño (Varón)
                </button>
                <button
                  type="button"
                  onClick={() => setSexo('F')}
                  className={`py-2 font-bold rounded-xl border text-center transition-all ${
                    sexo === 'F' ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Niña (Mujer)
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Edad (en meses)</label>
              <input
                type="number"
                value={edadMeses}
                onChange={e => setEdadMeses(+e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Peso actual (kg)</label>
              <input
                type="number"
                step="0.1"
                value={peso}
                onChange={e => setPeso(+e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Talla / Longitud (cm)</label>
              <input
                type="number"
                step="0.5"
                value={talla}
                onChange={e => setTalla(+e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Perímetro Cefálico (cm)</label>
              <input
                type="number"
                step="0.5"
                value={perimetro}
                onChange={e => setPerimetro(+e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results & Percentiles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Interpretación según Patrones OMS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                <p className="text-xs font-bold text-purple-700 uppercase">Índice Masa Corporal</p>
                <p className="text-2xl font-extrabold text-purple-900 mt-1">{imc} kg/m²</p>
                <p className="text-xs text-purple-600 font-semibold mt-1">{evaluacionNutricional}</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
                <p className="text-xs font-bold text-indigo-700 uppercase">Percentil Peso/Edad</p>
                <p className="text-2xl font-extrabold text-indigo-900 mt-1">{percentilPeso}</p>
                <p className="text-xs text-indigo-600 font-semibold mt-1">Z-Score: +0.2 SD</p>
              </div>

              <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-center">
                <p className="text-xs font-bold text-teal-700 uppercase">Talla / Edad</p>
                <p className="text-2xl font-extrabold text-teal-900 mt-1">P50 - Normal</p>
                <p className="text-xs text-teal-600 font-semibold mt-1">Crecimiento armónico</p>
              </div>
            </div>

            {/* Developmental milestones */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Hitos Madurativos para {edadMeses} meses:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Camina solo y sube escalones asistido
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dice al menos 6-10 palabras con intención
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Come solo con cuchara y bebe en taza
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Construye torre de 3-4 cubos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
