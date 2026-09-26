'use client';

import React, { useState } from 'react';
import { Syringe, Calendar, CheckCircle2, AlertCircle, Clock, Search, Plus } from 'lucide-react';

export default function VacunacionPage() {
  const [filterAge, setFilterAge] = useState<string>('todos');

  const vaccineSchedule = [
    { id: 1, edad: 'Recién Nacido', vacuna: 'BCG', enfermedad: 'Tuberculosis', dosis: 'Única', estado: 'Aplicada', fecha: '12/01/2026', lote: 'BCG-8891' },
    { id: 2, edad: 'Recién Nacido', vacuna: 'Hepatitis B Pediátrica', enfermedad: 'Hepatitis B', dosis: 'Dosis neonatal', estado: 'Aplicada', fecha: '12/01/2026', lote: 'HEP-4412' },
    { id: 3, edad: '2 Meses', vacuna: 'Quíntuple / Pentavalente', enfermedad: 'Difteria, Tétanos, Tos convulsa, Hep B, Hib', dosis: '1ra Dosis', estado: 'Aplicada', fecha: '15/03/2026', lote: 'QUI-1092' },
    { id: 4, edad: '2 Meses', vacuna: 'IPV (Salk)', enfermedad: 'Poliomielitis', dosis: '1ra Dosis', estado: 'Aplicada', fecha: '15/03/2026', lote: 'IPV-7711' },
    { id: 5, edad: '2 Meses', vacuna: 'Neumococo Conjugada', enfermedad: 'Neumonía y Meningitis', dosis: '1ra Dosis', estado: 'Aplicada', fecha: '15/03/2026', lote: 'NEU-9021' },
    { id: 6, edad: '2 Meses', vacuna: 'Rotavirus', enfermedad: 'Gastroenteritis por Rotavirus', dosis: '1ra Dosis', estado: 'Aplicada', fecha: '15/03/2026', lote: 'ROT-3321' },
    { id: 7, edad: '3 Meses', vacuna: 'Menveo / Meningococo', enfermedad: 'Enfermedad meningocócica', dosis: '1ra Dosis', estado: 'Pendiente', fecha: 'Programada 15/04/2026', lote: '--' },
    { id: 8, edad: '4 Meses', vacuna: 'Quíntuple + IPV + Neumococo', enfermedad: 'Refuerzo de 4 meses', dosis: '2da Dosis', estado: 'Pendiente', fecha: 'Programada 15/05/2026', lote: '--' },
    { id: 9, edad: '12 Meses', vacuna: 'Triple Viral (SRP)', enfermedad: 'Sarampión, Rubéola, Paperas', dosis: '1ra Dosis', estado: 'Pendiente', fecha: 'Al cumplir 1 año', lote: '--' }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Syringe className="w-3.5 h-3.5" /> Calendario Oficial Nacional
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Inmunizaciones & Vacunatorio</h1>
          <p className="text-teal-100 text-sm mt-1">Control de dosis aplicadas, trazabilidad de lotes y alertas de esquemas incompletos</p>
        </div>

        <button className="bg-white text-teal-800 hover:bg-teal-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Registrar Dosis Aplicada
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-base">Esquema de Vacunación del Paciente</h2>
          <span className="text-xs font-bold bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200">
            6 Dosis Aplicadas / 3 Pendientes
          </span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Edad Sugerida</th>
              <th className="p-4">Vacuna</th>
              <th className="p-4">Enfermedad Prevenida</th>
              <th className="p-4">Dosis</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Fecha / Lote</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vaccineSchedule.map(v => (
              <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-bold text-slate-900">{v.edad}</td>
                <td className="p-4 font-semibold text-teal-950">{v.vacuna}</td>
                <td className="p-4 text-slate-600 text-xs">{v.enfermedad}</td>
                <td className="p-4 text-slate-700 font-medium">{v.dosis}</td>
                <td className="p-4">
                  {v.estado === 'Aplicada' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Aplicada
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Pendiente
                    </span>
                  )}
                </td>
                <td className="p-4 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">{v.fecha}</p>
                  <p className="text-slate-400">Lote: {v.lote}</p>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors">
                    Carnet Digital
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
