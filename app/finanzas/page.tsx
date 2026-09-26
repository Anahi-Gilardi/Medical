'use client';

import React from 'react';
import { TrendingUp, DollarSign, Users, Activity, BarChart3, PieChart } from 'lucide-react';

export default function FinanzasPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Tablero de Control Ejecutivo
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Finanzas Clínicas, Rentabilidad & Balance</h1>
          <p className="text-emerald-100 text-sm mt-1">Evolución de ingresos, costos operativos y distribución por especialidad médica</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Facturación Bruta Mes</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">$11.520.000</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1">↑ +14.2% vs mes anterior</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Costos Operativos & Insumos</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">$4.830.000</p>
          <p className="text-xs text-slate-500 mt-1">Dentro del presupuesto</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Margen Operativo Neto</p>
          <p className="text-2xl font-extrabold text-teal-700 mt-1">58.1%</p>
          <p className="text-xs text-teal-600 font-semibold mt-1">Alta rentabilidad clínica</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Honorarios Profesionales</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">$3.950.000</p>
          <p className="text-xs text-indigo-600 font-semibold mt-1">Liquidado a 18 médicos</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b pb-3">Distribución de Ingresos por Especialidad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Guardia & Emergencias</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$4.200.000 <span className="text-xs text-slate-500 font-normal">(36%)</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Cardiología & Estudios</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$3.100.000 <span className="text-xs text-slate-500 font-normal">(27%)</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Clínica Médica</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$2.450.000 <span className="text-xs text-slate-500 font-normal">(21%)</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Pediatría & Vacunatorio</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$1.770.000 <span className="text-xs text-slate-500 font-normal">(16%)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
