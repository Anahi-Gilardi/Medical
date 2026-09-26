const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✔ Generated: ' + filePath);
}

// ==========================================
// 4. Emergencias & Guardia (app/emergencias/page.tsx)
// ==========================================
write('app/emergencias/page.tsx', `'use client';

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
          className={\`py-3 px-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 \${
            activeTab === 'shockroom' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          <Bed className="w-4 h-4" /> Camas & Shock Room
        </button>
        <button
          onClick={() => setActiveTab('espera')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 \${
            activeTab === 'espera' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
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
                  <div className={\`w-3.5 h-3.5 rounded-full \${bed.color}\`} />
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
                    <span className={\`text-xs font-bold px-2.5 py-1 rounded-full \${item.color}\`}>
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
`);

// ==========================================
// 5. Pediatría & Curvas OMS (app/pediatria/page.tsx)
// ==========================================
write('app/pediatria/page.tsx', `'use client';

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
                  className={\`py-2 font-bold rounded-xl border text-center transition-all \${
                    sexo === 'M' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }\`}
                >
                  Niño (Varón)
                </button>
                <button
                  type="button"
                  onClick={() => setSexo('F')}
                  className={\`py-2 font-bold rounded-xl border text-center transition-all \${
                    sexo === 'F' ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }\`}
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
`);

// ==========================================
// 6. Vacunación (app/vacunacion/page.tsx)
// ==========================================
write('app/vacunacion/page.tsx', `'use client';

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
`);

// ==========================================
// 7. Evolución Médica SOAP (app/evolucion/page.tsx)
// ==========================================
write('app/evolucion/page.tsx', `'use client';

import React, { useState } from 'react';
import { FileText, Stethoscope, Save, User, Calendar, Activity, CheckCircle2 } from 'lucide-react';

export default function EvolucionPage() {
  const [paciente, setPaciente] = useState('Gómez, Carlos (58 años - DNI 24.891.002)');
  const [subjetivo, setSubjetivo] = useState('Paciente refiere mejoría de dolor torácico tras inicio de nitratos y reposo. Niega disnea nocturna.');
  const [objetivo, setObjetivo] = useState('TA: 130/80 mmHg | FC: 74 lpm | FR: 16 rpm | SpO2: 98% aire ambiente. R1 y R2 normofonéticos, silencios libres. Murmullo vesicular conservado bilateral sin rales.');
  const [analisis, setAnalisis] = useState('Síndrome coronario agudo sin elevación de ST en estabilización clínica. Riesgo TIMI bajo-moderado.');
  const [plan, setPlan] = useState('1. Continuar AAS 100mg/d + Clopidogrel 75mg/d + Atorvastatina 40mg/noche.\\n2. Solicitar enzimas cardíacas (Troponina I) de control a las 18:00 hs.\\n3. Ecocardiograma Doppler transtorácico programado.');

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Registro Clínico SOAP
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Evolución Médica Diaria & Notas de Enfermería</h1>
          <p className="text-blue-100 text-sm mt-1">Estandarización internacional para pase de sala y seguimiento hospitalario</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Paciente Seleccionado</p>
              <p className="font-bold text-slate-900 text-base">{paciente}</p>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-600" /> Fecha: Hoy, 11:30 hs
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subjetivo */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-extrabold">S</span>
              Subjetivo (Relato del paciente / Anamnesis)
            </label>
            <textarea
              rows={4}
              value={subjetivo}
              onChange={e => setSubjetivo(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Objetivo */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-extrabold">O</span>
              Objetivo (Examen físico & Signos vitales)
            </label>
            <textarea
              rows={4}
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
            />
          </div>

          {/* Analisis */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-extrabold">A</span>
              Análisis (Diagnóstico & Evaluación de respuesta)
            </label>
            <textarea
              rows={4}
              value={analisis}
              onChange={e => setAnalisis(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Plan */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-extrabold">P</span>
              Plan (Terapéutica, Estudios & Conducta)
            </label>
            <textarea
              rows={4}
              value={plan}
              onChange={e => setPlan(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {savedMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Evolución clínica guardada y firmada digitalmente con éxito.
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" /> Guardar y Firmar Evolución
          </button>
        </div>
      </form>
    </div>
  );
}
`);

// ==========================================
// 8. Estudios & Lab (app/estudios/page.tsx)
// ==========================================
write('app/estudios/page.tsx', `'use client';

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
`);

// ==========================================
// 9. Dispensario & APS (app/dispensario/page.tsx)
// ==========================================
write('app/dispensario/page.tsx', `'use client';

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
`);

// ==========================================
// 10. Telemedicina (app/telemedicina/page.tsx)
// ==========================================
write('app/telemedicina/page.tsx', `'use client';

import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Send, User, ShieldCheck } from 'lucide-react';

export default function TelemedicinaPage() {
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Dr. Roberto Gómez', text: 'Buenas tardes Carlos, ¿cómo se siente hoy con la medicación?' },
    { sender: 'Carlos Méndez (Paciente)', text: 'Hola Doctor, mucho mejor, ya no siento opresión en el pecho.' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([...messages, { sender: 'Dr. Roberto Gómez', text: chatMessage }]);
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" /> Sala Virtual Segura (WebRTC Encrypted)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Telemedicina & Consultorio Virtual</h1>
          <p className="text-indigo-100 text-sm mt-1">Videoconsulta médica encriptada, chat clínico e indicaciones en vivo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Stage */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col h-[500px]">
          <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-teal-600/20 text-teal-400 border-2 border-teal-500/40 flex items-center justify-center mx-auto text-3xl font-bold shadow-2xl animate-pulse">
                CM
              </div>
              <h3 className="text-white font-bold text-lg">Carlos Méndez (58 años)</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Conectado en línea (HD 1080p)
              </span>
            </div>

            {/* Doctor thumbnail */}
            <div className="absolute top-4 right-4 w-32 h-24 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex items-center justify-center">
              <span className="text-xs font-bold text-slate-300">Tú (Dr. Gómez)</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-4">
            <button
              onClick={() => setMicActive(!micActive)}
              className={\`p-3.5 rounded-full font-bold transition-all \${
                micActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'
              }\`}
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCamActive(!camActive)}
              className={\`p-3.5 rounded-full font-bold transition-all \${
                camActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'
              }\`}
            >
              {camActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => alert('Consulta finalizada con éxito.')}
              className="p-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all font-bold"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat / Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-600" /> Chat de Consulta
            </h3>
            <span className="text-[10px] bg-slate-200 font-bold px-2 py-0.5 rounded text-slate-700">Privado</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1 shadow-sm">
                <p className="font-bold text-teal-800">{m.sender}</p>
                <p className="text-slate-700 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder="Escribe una indicación..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
`);

console.log('✔ Batch 1 completed successfully.');

