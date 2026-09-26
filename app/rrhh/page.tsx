'use client';

import React from 'react';
import { UserCheck, Stethoscope, ShieldCheck, Plus, Mail, Phone, Calendar } from 'lucide-react';

export default function RrhhPage() {
  const staff = [
    { id: 1, nombre: 'Dr. Roberto Gómez', rol: 'Médico Cardiólogo / Jefe Guardia', matricula: 'MN 114.890', guardia: 'Lunes y Miércoles 08:00 - 20:00', estado: 'En Servicio' },
    { id: 2, nombre: 'Dra. María Paz', rol: 'Médica Traumatóloga', matricula: 'MN 128.902', guardia: 'Martes y Jueves 08:00 - 16:00', estado: 'En Servicio' },
    { id: 3, nombre: 'Dr. Lucas Varela', rol: 'Médico Pediatra', matricula: 'MN 135.401', guardia: 'Lunes a Viernes 14:00 - 20:00', estado: 'Disponible' },
    { id: 4, nombre: 'Lic. Claudia Morales', rol: 'Enfermera Jefa', matricula: 'ENF 8.902', guardia: 'Guardia Rotativa 12x36', estado: 'En Servicio' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-800 via-teal-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Cuerpo Médico & Staff
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Recursos Humanos, Guardias & Profesionales</h1>
          <p className="text-slate-200 text-sm mt-1">Gestión de matrículas, asignación de turnos de guardia y disponibilidad</p>
        </div>

        <button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Agregar Profesional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map(s => (
          <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{s.nombre}</h3>
                <p className="text-xs font-semibold text-teal-700">{s.rol}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Matrícula: {s.matricula}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {s.estado}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p className="text-slate-500 font-medium">Horario de Guardia / Atención:</p>
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" /> {s.guardia}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
