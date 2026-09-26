'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  HeartPulse,
  FileText,
  ArrowUpRight,
  Plus,
  Activity
} from 'lucide-react';
import { StorageService } from '@/lib/storage-service';
import { Paciente, Turno, Evolucion } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const { user, clinicaActiva } = useAuth();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [evoluciones, setEvoluciones] = useState<Evolucion[]>([]);

  useEffect(() => {
    setPacientes(StorageService.getPacientes());
    setTurnos(StorageService.getTurnos());
    setEvoluciones(StorageService.getEvoluciones().slice(0, 5));
  }, []);

  const internadosCount = pacientes.filter(p => p.estado === 'Internado').length;
  const turnosHoyCount = turnos.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-gradient-to-r from-teal-800 to-slate-900 p-6 text-white shadow-sm">
        <div>
          <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-inset ring-teal-500/30">
            Panel Principal
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Hola, {user?.nombre || 'Dr. Alejandro Martinez'}
          </h1>
          <p className="text-xs text-teal-100/80 mt-0.5">
            {clinicaActiva?.nombre || 'MediCare Central'} · {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 sm:pt-0">
          <Link
            href="/pacientes?nuevo=true"
            className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-400 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuevo Paciente
          </Link>
          <Link
            href="/agenda"
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            Ver Agenda
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pacientes Activos</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{pacientes.length}</span>
            <span className="text-xs font-medium text-emerald-600">Registrados</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Turnos Hoy</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{turnosHoyCount}</span>
            <span className="text-xs font-medium text-slate-500">En agenda</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Internación</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{internadosCount}</span>
            <span className="text-xs font-medium text-amber-600">En seguimiento</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recetas Emitidas</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">24</span>
            <span className="text-xs font-medium text-purple-600">Digitales</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              <h2 className="text-base font-bold text-slate-900">Turnos y Visitas Programadas</h2>
            </div>
            <Link href="/agenda" className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Hora</th>
                  <th className="pb-3">Paciente</th>
                  <th className="pb-3">Profesional</th>
                  <th className="pb-3">Tipo / Motivo</th>
                  <th className="pb-3 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {turnos.slice(0, 5).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-semibold text-slate-800">{t.hora}</td>
                    <td className="py-3">
                      <Link href={'/pacientes/' + t.pacienteId} className="font-medium text-teal-700 hover:underline">
                        {t.pacienteNombre}
                      </Link>
                      <p className="text-[11px] text-slate-400">DNI {t.pacienteDni}</p>
                    </td>
                    <td className="py-3 text-slate-600">{t.profesionalNombre}</td>
                    <td className="py-3 text-slate-500">
                      <span className="font-medium text-slate-700">{t.tipo}</span> · {t.motivo}
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-sky-100 text-sky-800">
                        {t.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-teal-600" />
                <h2 className="text-base font-bold text-slate-900">Evoluciones Recientes</h2>
              </div>
            </div>

            <div className="space-y-4">
              {evoluciones.map((evo) => (
                <div key={evo.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="font-semibold text-teal-700">{evo.profesionalNombre}</span>
                    <span className="text-[10px]">
                      {new Date(evo.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 text-[11px]">{evo.tipoNota}</p>
                  <p className="text-slate-600 line-clamp-2 mt-1">{evo.evolucionClinica}</p>
                  {evo.signosVitales?.presionArterial && (
                    <div className="mt-2 flex gap-2 text-[10px] text-slate-500 font-mono bg-white p-1.5 rounded-lg border border-slate-100">
                      <span>TA: <strong>{evo.signosVitales.presionArterial}</strong></span>
                      <span>FC: <strong>{evo.signosVitales.frecuenciaCardiaca} lpm</strong></span>
                      <span>SpO2: <strong>{evo.signosVitales.saturacionOxigeno}%</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/pacientes"
            className="mt-4 block w-full text-center rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Buscar en Fichas Médicas
          </Link>
        </div>
      </div>
    </div>
  );
}
