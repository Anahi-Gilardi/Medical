'use client';

import React, { useState } from 'react';
import {
  Siren,
  Activity,
  UserPlus,
  Clock,
  HeartPulse,
  AlertTriangle,
  Bed,
  CheckCircle2,
  Stethoscope,
  Filter,
  ArrowRight
} from 'lucide-react';

export default function EmergenciasPage() {
  const [activeTab, setActiveTab] = useState<'shockroom' | 'espera' | 'triage'>('shockroom');
  const [showTriageModal, setShowTriageModal] = useState(false);

  const [shockBeds, setShockBeds] = useState([
    {
      id: 1,
      name: 'Cama Shock 01',
      paciente: 'Carlos Méndez (58a)',
      motivo: 'Dolor precordial opresivo + sudoración profusa',
      nivel: 'Nivel 1 - Resucitación',
      color: 'bg-red-500',
      ta: '160/95',
      fc: '112 lpm',
      spo2: '94%',
      temp: '36.8°C',
      medico: 'Dr. Roberto Gómez',
      ingreso: 'Hace 25 min'
    },
    {
      id: 2,
      name: 'Cama Shock 02',
      paciente: 'Valeria Rossi (34a)',
      motivo: 'Politraumatismo vial leve-moderado',
      nivel: 'Nivel 2 - Emergencia',
      color: 'bg-orange-500',
      ta: '120/75',
      fc: '88 lpm',
      spo2: '98%',
      temp: '36.5°C',
      medico: 'Dra. María Paz',
      ingreso: 'Hace 45 min'
    },
    {
      id: 3,
      name: 'Cama Observación 03',
      paciente: 'Libre',
      motivo: 'Disponible para ingreso',
      nivel: 'Disponible',
      color: 'bg-emerald-500',
      ta: '--',
      fc: '--',
      spo2: '--',
      temp: '--',
      medico: 'Enfermería de Guardia',
      ingreso: '--'
    },
    {
      id: 4,
      name: 'Cama Observación 04',
      paciente: 'Lucas Peralta (12a)',
      motivo: 'Crisis asmática moderada en nebulización',
      nivel: 'Nivel 3 - Urgencia',
      color: 'bg-amber-500',
      ta: '110/70',
      fc: '95 lpm',
      spo2: '96%',
      temp: '37.1°C',
      medico: 'Dr. Lucas Varela',
      ingreso: 'Hace 1h 10m'
    }
  ]);

  const [triageQueue, setTriageQueue] = useState([
    { id: 101, paciente: 'Marta Solís (68a)', motivo: 'Disnea de esfuerzo progresiva', nivel: 'Nivel 2 - Emergencia', color: 'bg-orange-500 text-white', espera: '8 min', estado: 'Esperando médico' },
    { id: 102, paciente: 'Jorge Benítez (45a)', motivo: 'Cólico renal agudo', nivel: 'Nivel 3 - Urgencia', color: 'bg-amber-500 text-white', espera: '18 min', estado: 'Analgesia indicada' },
    { id: 103, paciente: 'Lucía Fernández (27a)', motivo: 'Traumatismo de tobillo cerrado', nivel: 'Nivel 4 - Menor', color: 'bg-emerald-500 text-white', espera: '35 min', estado: 'Esperando Rx' },
    { id: 104, paciente: 'Esteban Greco (52a)', motivo: 'Renovación de receta crónica', nivel: 'Nivel 5 - No urgente', color: 'bg-blue-500 text-white', espera: '50 min', estado: 'En sala de espera' }
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Siren className="w-3.5 h-3.5 animate-pulse" /> Guardia Activa 24/7
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Emergencias & Shock Room</h1>
          <p className="text-red-100 text-sm mt-1">Triaje Manchester, monitorización de camas críticas y gestión de guardia en tiempo real</p>
        </div>

        <button
          onClick={() => setShowTriageModal(true)}
          className="bg-white text-red-700 hover:bg-red-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0"
        >
          <UserPlus className="w-4 h-4" /> Ingreso Rápido Triaje
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl"><Activity className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Camas Shock Ocupadas</p>
            <p className="text-2xl font-bold text-slate-900">3 / 4 <span className="text-xs text-red-600 font-semibold">(75%)</span></p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Tiempo Medio de Espera</p>
            <p className="text-2xl font-bold text-slate-900">14 min</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-100 text-teal-600 rounded-xl"><Stethoscope className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Médicos de Guardia</p>
            <p className="text-2xl font-bold text-slate-900">4 Activos</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Altas / Pases Hoy</p>
            <p className="text-2xl font-bold text-slate-900">19 Pacientes</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2">
        <button
          onClick={() => setActiveTab('shockroom')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'shockroom' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bed className="w-4 h-4" /> Camas & Shock Room
        </button>
        <button
          onClick={() => setActiveTab('espera')}
          className={`py-3 px-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'espera' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" /> Cola de Triaje & Espera ({triageQueue.length})
        </button>
      </div>

      {/* Tab 1: Shock Room */}
      {activeTab === 'shockroom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {shockBeds.map(bed => (
            <div key={bed.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${bed.color}`} />
                  <span className="font-bold text-slate-900 text-base">{bed.name}</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
                  {bed.nivel}
                </span>
              </div>

              <div className="p-5 flex-1 space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Paciente</p>
                  <p className="text-base font-bold text-slate-900">{bed.paciente}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{bed.motivo}</p>
                </div>

                {bed.paciente !== 'Libre' && (
                  <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">T.A.</p>
                      <p className="text-xs font-bold text-slate-900">{bed.ta}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">F.C.</p>
                      <p className="text-xs font-bold text-slate-900">{bed.fc}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">SpO2</p>
                      <p className="text-xs font-bold text-slate-900">{bed.spo2}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Temp</p>
                      <p className="text-xs font-bold text-slate-900">{bed.temp}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Médico: <strong className="text-slate-800">{bed.medico}</strong></span>
                  <span>Ingreso: <strong className="text-slate-800">{bed.ingreso}</strong></span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 justify-end">
                {bed.paciente !== 'Libre' ? (
                  <>
                    <button className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                      Evolucionar
                    </button>
                    <button className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
                      Dar Alta / Pase
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowTriageModal(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    Asignar Paciente
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Cola de Espera */}
      {activeTab === 'espera' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Prioridad / Triaje</th>
                <th className="p-4">Paciente</th>
                <th className="p-4">Motivo de Consulta</th>
                <th className="p-4">Tiempo en Espera</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {triageQueue.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.color}`}>
                      {item.nivel}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">{item.paciente}</td>
                  <td className="p-4 text-slate-600">{item.motivo}</td>
                  <td className="p-4 font-semibold text-slate-700">{item.espera}</td>
                  <td className="p-4"><span className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-700">{item.estado}</span></td>
                  <td className="p-4 text-right">
                    <button className="text-teal-600 hover:text-teal-800 font-bold text-xs bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors">
                      Llamar Box
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Ingreso */}
      {showTriageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Siren className="w-5 h-5 text-red-600" /> Ingreso Rápido de Triaje Manchester
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre Completo y Edad</label>
                <input type="text" placeholder="Ej: Roberto Sánchez (62a)" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Motivo Principal de Consulta</label>
                <textarea rows={2} placeholder="Descripción de síntomas y signos..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Clasificación de Prioridad</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none font-semibold">
                  <option value="1">Nivel 1 - Rojo (Resucitación inmediata - 0 min)</option>
                  <option value="2">Nivel 2 - Naranja (Emergencia crítica - max 10 min)</option>
                  <option value="3">Nivel 3 - Amarillo (Urgencia médica - max 60 min)</option>
                  <option value="4">Nivel 4 - Verde (Menor - max 120 min)</option>
                  <option value="5">Nivel 5 - Azul (No urgente - max 240 min)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowTriageModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Paciente ingresado a guardia correctamente.');
                  setShowTriageModal(false);
                }}
                className="px-5 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
              >
                Confirmar Ingreso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
