'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AlertTriangle,
  Plus,
  Clock,
  Stethoscope,
  Pill,
  Calendar,
  X
} from 'lucide-react';
import { StorageService } from '@/lib/storage-service';
import { Paciente, Evolucion, Receta, Turno } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

export default function PacienteDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [evoluciones, setEvoluciones] = useState<Evolucion[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [activeTab, setActiveTab] = useState<'evoluciones' | 'recetas' | 'turnos'>('evoluciones');

  const [showEvoModal, setShowEvoModal] = useState(false);
  const [evoForm, setEvoForm] = useState({
    tipoNota: 'Evolución Médica' as Evolucion['tipoNota'],
    evolucionClinica: '',
    indicaciones: '',
    presionArterial: '120/80',
    frecuenciaCardiaca: 75,
    frecuenciaRespiratoria: 16,
    temperatura: 36.5,
    saturacionOxigeno: 98,
    glucemia: 100,
    peso: 75,
  });

  const loadData = () => {
    const p = StorageService.getPacienteById(resolvedParams.id);
    if (!p) {
      router.push('/pacientes');
      return;
    }
    setPaciente(p);
    setEvoluciones(StorageService.getEvoluciones(p.id));
    setRecetas(StorageService.getRecetas(p.id));
    const allTurnos = StorageService.getTurnos();
    setTurnos(allTurnos.filter(t => t.pacienteId === p.id));
  };

  useEffect(() => {
    loadData();
  }, [resolvedParams.id]);

  const handleSaveEvolucion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paciente || !evoForm.evolucionClinica) return;

    StorageService.addEvolucion({
      pacienteId: paciente.id,
      profesionalNombre: user?.nombre || 'Dr. Alejandro Martinez',
      profesionalRol: user?.perfilProfesional || user?.rol || 'Médico',
      matricula: user?.matricula,
      tipoNota: evoForm.tipoNota,
      evolucionClinica: evoForm.evolucionClinica,
      indicaciones: evoForm.indicaciones,
      signosVitales: {
        presionArterial: evoForm.presionArterial,
        frecuenciaCardiaca: Number(evoForm.frecuenciaCardiaca),
        frecuenciaRespiratoria: Number(evoForm.frecuenciaRespiratoria),
        temperatura: Number(evoForm.temperatura),
        saturacionOxigeno: Number(evoForm.saturacionOxigeno),
        glucemia: Number(evoForm.glucemia),
        peso: Number(evoForm.peso),
        fechaHora: new Date().toISOString(),
        profesional: user?.nombre || 'Médico',
      },
    });

    loadData();
    setShowEvoModal(false);
    setEvoForm({
      tipoNota: 'Evolución Médica',
      evolucionClinica: '',
      indicaciones: '',
      presionArterial: '120/80',
      frecuenciaCardiaca: 75,
      frecuenciaRespiratoria: 16,
      temperatura: 36.5,
      saturacionOxigeno: 98,
      glucemia: 100,
      peso: 75,
    });
  };

  if (!paciente) {
    return <div className="py-12 text-center text-xs text-slate-500">Cargando historia clínica...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/pacientes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a Pacientes
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 text-lg font-bold">
                {paciente.apellido.charAt(0)}{paciente.nombre.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">
                    {paciente.apellido}, {paciente.nombre}
                  </h1>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    {paciente.estado}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  DNI <strong>{paciente.dni}</strong> · {paciente.edad ? paciente.edad + ' años' : ''} ({paciente.fechaNacimiento}) · Sexo {paciente.sexo}
                </p>
                <p className="text-xs text-teal-700 font-medium mt-0.5">
                  {paciente.obraSocial} · Afiliado: {paciente.numeroAfiliado || 'N/A'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowEvoModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Nueva Evolución / Signos
            </button>
          </div>

          {paciente.alergias && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span><strong>Alergias Conocidas:</strong> {paciente.alergias}</span>
            </div>
          )}

          {paciente.antecedentes && (
            <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <strong>Antecedentes Patológicos:</strong> {paciente.antecedentes}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('evoluciones')}
          className="flex items-center gap-2 border-b-2 pb-3 px-3 transition-colors border-teal-600 text-teal-600"
        >
          <Stethoscope className="h-4 w-4" />
          Evoluciones e Historia Clínica ({evoluciones.length})
        </button>
        <button
          onClick={() => setActiveTab('recetas')}
          className="flex items-center gap-2 border-b-2 pb-3 px-3 transition-colors border-transparent text-slate-500 hover:text-slate-700"
        >
          <Pill className="h-4 w-4" />
          Recetas y Medicación ({recetas.length})
        </button>
        <button
          onClick={() => setActiveTab('turnos')}
          className="flex items-center gap-2 border-b-2 pb-3 px-3 transition-colors border-transparent text-slate-500 hover:text-slate-700"
        >
          <Calendar className="h-4 w-4" />
          Historial de Visitas / Turnos ({turnos.length})
        </button>
      </div>

      {activeTab === 'evoluciones' && (
        <div className="space-y-4">
          {evoluciones.map((evo) => (
            <div key={evo.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-bold text-teal-700">
                    {evo.tipoNota}
                  </span>
                  <span className="text-xs font-semibold text-slate-900">
                    {evo.profesionalNombre} ({evo.profesionalRol})
                  </span>
                  {evo.matricula && <span className="text-[11px] text-slate-400 font-mono">· {evo.matricula}</span>}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(evo.fechaHora).toLocaleString('es-AR')}
                </div>
              </div>

              {evo.signosVitales?.presionArterial && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Tensión Arterial</span>
                    <span className="font-bold text-slate-900">{evo.signosVitales.presionArterial}</span> mmHg
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Frec. Cardíaca</span>
                    <span className="font-bold text-slate-900">{evo.signosVitales.frecuenciaCardiaca}</span> lpm
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Frec. Respirat.</span>
                    <span className="font-bold text-slate-900">{evo.signosVitales.frecuenciaRespiratoria}</span> rpm
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">SpO2</span>
                    <span className="font-bold text-slate-900">{evo.signosVitales.saturacionOxigeno}</span>%
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Temperatura</span>
                    <span className="font-bold text-slate-900">{evo.signosVitales.temperatura}</span> °C
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                {evo.evolucionClinica}
              </div>

              {evo.indicaciones && (
                <div className="rounded-xl bg-teal-50/50 p-3 text-xs text-teal-900 border border-teal-100">
                  <strong className="block mb-1 text-teal-800">Indicaciones Médicas:</strong>
                  {evo.indicaciones}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showEvoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Cargar Evolución Médica</h2>
                <p className="text-xs text-slate-500">Paciente: {paciente.apellido}, {paciente.nombre}</p>
              </div>
              <button
                onClick={() => setShowEvoModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvolucion} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Tipo de Nota</label>
                <select
                  value={evoForm.tipoNota}
                  onChange={(e) => setEvoForm({ ...evoForm, tipoNota: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Evolución Médica">Evolución Médica</option>
                  <option value="Control Enfermería">Control Enfermería</option>
                  <option value="Ingreso">Ingreso / Admisión</option>
                  <option value="Guardia">Atención en Guardia</option>
                  <option value="Epicrisis">Epicrisis / Alta</option>
                </select>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-3">
                <span className="block font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  Signos Vitales y Constantes
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium">Tensión Art. (mmHg)</label>
                    <input
                      type="text"
                      value={evoForm.presionArterial}
                      onChange={(e) => setEvoForm({ ...evoForm, presionArterial: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium">Frec. Cardíaca (lpm)</label>
                    <input
                      type="number"
                      value={evoForm.frecuenciaCardiaca}
                      onChange={(e) => setEvoForm({ ...evoForm, frecuenciaCardiaca: Number(e.target.value) })}
                      className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium">SpO2 (%)</label>
                    <input
                      type="number"
                      value={evoForm.saturacionOxigeno}
                      onChange={(e) => setEvoForm({ ...evoForm, saturacionOxigeno: Number(e.target.value) })}
                      className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium">Temperatura (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={evoForm.temperatura}
                      onChange={(e) => setEvoForm({ ...evoForm, temperatura: Number(e.target.value) })}
                      className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Evolución Clínica / Examen Físico *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describir el estado del paciente, examen físico, hallazgos y conducta..."
                  value={evoForm.evolucionClinica}
                  onChange={(e) => setEvoForm({ ...evoForm, evolucionClinica: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Indicaciones Terapéuticas y Plan</label>
                <textarea
                  rows={2}
                  placeholder="Tratamiento farmacológico, pautas de alarma, próximo control..."
                  value={evoForm.indicaciones}
                  onChange={(e) => setEvoForm({ ...evoForm, indicaciones: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEvoModal(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-teal-700"
                >
                  Guardar en Historia Clínica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
