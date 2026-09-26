'use client';

import React from 'react';
import { FlaskConical, FileText, CheckCircle2, Clock, AlertCircle, Download, Plus } from 'lucide-react';

export default function EstudiosPage() {
  const labReports = [
    { id: 'LAB-901', estudio: 'Hemograma Completo + Coagulograma', paciente: 'Carlos Méndez', fecha: '25/09/2026', estado: 'Informado', critico: false, medico: 'Dr. Roberto Gómez' },
    { id: 'LAB-902', estudio: 'Troponina I Cuantitativa', paciente: 'Carlos Méndez', fecha: '25/09/2026', estado: 'Informado', critico: true, medico: 'Dr. Roberto Gómez' },
    { id: 'IMG-304', estudio: 'Radiografía de Tórax F y P', paciente: 'Valeria Rossi', fecha: '24/09/2026', estado: 'Validado', critico: false, medico: 'Dra. María Paz' },
    { id: 'IMG-305', estudio: 'Ecocardiograma Doppler Color', paciente: 'Jorge Benítez', fecha: '24/09/2026', estado: 'En Análisis', critico: false, medico: 'Dr. Lucas Varela' },
    { id: 'LAB-903', estudio: 'Perfil Lipídico + Glucemia + HbA1c', paciente: 'Marta Solís', fecha: '23/09/2026', estado: 'Informado', critico: false, medico: 'Dra. Elena Ruiz' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" /> Laboratorio & Diagnóstico por Imágenes
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Estudios Médicos, Prácticas & Resultados</h1>
          <p className="text-teal-100 text-sm mt-1">Carga de protocolos, rangos de referencia y detección de valores críticos</p>
        </div>

        <button className="bg-white text-teal-800 hover:bg-teal-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Solicitar Nueva Práctica
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Protocolo / ID</th>
              <th className="p-4">Estudio / Práctica</th>
              <th className="p-4">Paciente</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Médico Solicitante</th>
              <th className="p-4 text-right">Informe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {labReports.map(r => (
              <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-700 text-xs">{r.id}</td>
                <td className="p-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    {r.estudio}
                    {r.critico && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-red-200">
                        VALOR CRÍTICO
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-slate-800 font-semibold">{r.paciente}</td>
                <td className="p-4 text-slate-600 text-xs">{r.fecha}</td>
                <td className="p-4">
                  {r.estado === 'Informado' || r.estado === 'Validado' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {r.estado}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {r.estado}
                    </span>
                  )}
                </td>
                <td className="p-4 text-xs text-slate-600">{r.medico}</td>
                <td className="p-4 text-right">
                  <button className="text-teal-700 hover:text-teal-900 font-bold text-xs bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors inline-flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> PDF
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
