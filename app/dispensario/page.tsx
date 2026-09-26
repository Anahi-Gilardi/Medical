'use client';

import React from 'react';
import { Building2, Users, HeartHandshake, Package, CheckCircle2, MapPin } from 'lucide-react';

export default function DispensarioPage() {
  const communityPrograms = [
    { id: 1, name: 'Programa Materno-Infantil', beneficiarios: 142, estado: 'Activo', cobertura: '95%' },
    { id: 2, name: 'Programa Crónicos (HTA & Diabetes)', beneficiarios: 310, estado: 'Activo', cobertura: '88%' },
    { id: 3, name: 'Salud Escolar y Detección Temprana', beneficiarios: 89, estado: 'En Curso', cobertura: '92%' },
    { id: 4, name: 'Entrega de Leche y Suplementos', beneficiarios: 76, estado: 'Activo', cobertura: '100%' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-green-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Atención Primaria de la Salud (APS)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Dispensario Comunitario & Programas Sanitarios</h1>
          <p className="text-emerald-100 text-sm mt-1">Gestión territorial, botiquines esenciales y seguimiento de salud pública</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityPrograms.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{p.estado}</span>
              <span className="text-xs font-extrabold text-teal-700">Cob: {p.cobertura}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{p.name}</h3>
            <p className="text-2xl font-extrabold text-slate-800">{p.beneficiarios} <span className="text-xs text-slate-500 font-semibold">beneficiarios</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
