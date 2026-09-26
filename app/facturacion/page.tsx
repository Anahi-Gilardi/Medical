'use client';

import React from 'react';
import { Receipt, Building2, CheckCircle2, Clock, AlertCircle, Download, Plus } from 'lucide-react';

export default function FacturacionPage() {
  const billingBatches = [
    { id: 'LOTE-2026-09A', obraSocial: 'OSDE', prestaciones: 184, total: 3420000, estado: 'Liquidada', fecha: '20/09/2026' },
    { id: 'LOTE-2026-09B', obraSocial: 'Swiss Medical', prestaciones: 96, total: 1950000, estado: 'En Auditoría', fecha: '22/09/2026' },
    { id: 'LOTE-2026-09C', obraSocial: 'PAMI', prestaciones: 312, total: 4800000, estado: 'Presentada', fecha: '24/09/2026' },
    { id: 'LOTE-2026-09D', obraSocial: 'Galeno', prestaciones: 74, total: 1350000, estado: 'Liquidada', fecha: '25/09/2026' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5" /> Convenios & Obras Sociales
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Facturación de Prestaciones & Nomenclador</h1>
          <p className="text-blue-100 text-sm mt-1">Generación de lotes electrónicos, auditoría de débitos y liquidaciones</p>
        </div>

        <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Generar Lote de Facturación
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Lote / ID</th>
              <th className="p-4">Financiador / Obra Social</th>
              <th className="p-4">Cantidad Prestaciones</th>
              <th className="p-4">Importe Total</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Fecha Presentación</th>
              <th className="p-4 text-right">Exportar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {billingBatches.map(b => (
              <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-mono font-bold text-xs text-slate-700">{b.id}</td>
                <td className="p-4 font-bold text-slate-900">{b.obraSocial}</td>
                <td className="p-4 text-slate-600 font-semibold">{b.prestaciones} consultas/prácticas</td>
                <td className="p-4 font-extrabold text-blue-900">${b.total.toLocaleString('es-AR')}</td>
                <td className="p-4">
                  {b.estado === 'Liquidada' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Liquidada
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {b.estado}
                    </span>
                  )}
                </td>
                <td className="p-4 text-xs text-slate-500">{b.fecha}</td>
                <td className="p-4 text-right">
                  <button className="text-blue-700 hover:text-blue-900 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 inline-flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> TXT / Excel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
