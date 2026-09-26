'use client';

import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, FileText, Download } from 'lucide-react';

export default function AuditoriaPage() {
  const auditLogs = [
    { id: 'LOG-88912', timestamp: '26/09/2026 11:32:05', usuario: 'Dr. Roberto Gómez (Cardiología)', accion: 'Firma y Emisión de Receta', paciente: 'Carlos Méndez (DNI 24.891.002)', ip: '192.168.1.45', hash: 'SHA256:7f8a91c...' },
    { id: 'LOG-88911', timestamp: '26/09/2026 11:20:12', usuario: 'Dra. María Paz (Traumatología)', accion: 'Evolución Médica SOAP Guardada', paciente: 'Valeria Rossi (DNI 32.110.405)', ip: '192.168.1.52', hash: 'SHA256:3b42ef8...' },
    { id: 'LOG-88910', timestamp: '26/09/2026 10:45:00', usuario: 'Recepción Guardia (Valeria S.)', accion: 'Triaje Manchester Ingresado', paciente: 'Carlos Méndez (DNI 24.891.002)', ip: '192.168.1.10', hash: 'SHA256:90a1bc4...' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Seguridad Jurídica & Trazabilidad
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Registro Inmutable de Auditoría & Consentimientos</h1>
          <p className="text-slate-300 text-sm mt-1">Audit Trail inalterable para cumplimiento de la Ley de Derechos del Paciente e Historia Clínica Digital</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" /> Registro Criptográfico de Operaciones
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Cadena de Bloques e Integridad Verificada
          </span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Timestamp / ID</th>
              <th className="p-4">Usuario Responsable</th>
              <th className="p-4">Acción Realizada</th>
              <th className="p-4">Paciente Afectado</th>
              <th className="p-4">Firma Digital (Hash)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(l => (
              <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{l.timestamp}</p>
                  <p className="font-mono text-slate-400">{l.id}</p>
                </td>
                <td className="p-4 font-bold text-slate-800">{l.usuario}</td>
                <td className="p-4 font-semibold text-teal-800">{l.accion}</td>
                <td className="p-4 text-slate-700">{l.paciente}</td>
                <td className="p-4 font-mono text-slate-500">{l.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
