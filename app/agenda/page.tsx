'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  XCircle,
  Building,
  Home,
  Video,
  X
} from 'lucide-react';
import { StorageService } from '@/lib/storage-service';
import { Turno, Paciente, Usuario } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

export default function AgendaPage() {
  const { clinicaActiva } = useAuth();
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterEstado, setFilterEstado] = useState<string>('Todos');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    pacienteId: '',
    profesionalId: '',
    especialidad: 'Cardiología',
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    motivo: '',
    tipo: 'Consultorio' as Turno['tipo'],
  });

  const loadData = () => {
    setTurnos(StorageService.getTurnos());
    setPacientes(StorageService.getPacientes());
    setUsuarios(StorageService.getUsuarios().filter(u => u.rol === 'Medico' || u.rol === 'Enfermeria' || u.rol === 'SuperAdmin'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateEstado = (turnoId: string, nuevoEstado: Turno['estado']) => {
    StorageService.updateTurnoEstado(turnoId, nuevoEstado);
    loadData();
  };

  const handleCreateTurno = (e: React.FormEvent) => {
    e.preventDefault();
    const p = pacientes.find(item => item.id === formData.pacienteId);
    const prof = usuarios.find(item => item.id === formData.profesionalId);
    if (!p || !prof) return;

    StorageService.addTurno({
      pacienteId: p.id,
      pacienteNombre: p.apellido + ', ' + p.nombre,
      pacienteDni: p.dni,
      profesionalId: prof.id,
      profesionalNombre: prof.nombre,
      especialidad: formData.especialidad,
      fecha: formData.fecha,
      hora: formData.hora,
      motivo: formData.motivo || 'Consulta médica programada',
      tipo: formData.tipo,
      estado: 'Confirmado',
      clinica: clinicaActiva?.nombre || 'MediCare Central',
    });

    loadData();
    setShowModal(false);
  };

  const filtered = turnos.filter((t) => {
    const matchDate = !filterDate || t.fecha === filterDate;
    const matchEstado = filterEstado === 'Todos' || t.estado === filterEstado;
    return matchDate && matchEstado;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Agenda y Turnos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Programación de consultas ambulatorias, visitas a domicilio y telemedicina
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Agendar Nuevo Turno
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <CalendarIcon className="h-4 w-4 text-teal-600" />
            <span>Fecha:</span>
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 text-xs">
          {['Todos', 'En Sala de Espera', 'Confirmado', 'Atendido', 'Cancelado'].map((est) => (
            <button
              key={est}
              onClick={() => setFilterEstado(est)}
              className="rounded-lg px-3 py-1.5 font-medium transition-all text-slate-600 hover:text-slate-900"
            >
              {est}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-200"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100 text-slate-800 font-bold text-sm">
                <Clock className="h-3.5 w-3.5 text-teal-600 mb-0.5" />
                {t.hora}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Link href={'/pacientes/' + t.pacienteId} className="font-bold text-slate-900 hover:text-teal-700 text-sm">
                    {t.pacienteNombre}
                  </Link>
                  <span className="text-[11px] text-slate-400 font-mono">DNI {t.pacienteDni}</span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-sky-100 text-sky-800">
                    {t.tipo}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Profesional:</strong> {t.profesionalNombre} ({t.especialidad})
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong>Motivo:</strong> {t.motivo}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <span className="rounded-full px-3 py-1 text-[11px] font-semibold bg-teal-100 text-teal-800">
                {t.estado}
              </span>

              {t.estado !== 'Atendido' && t.estado !== 'Cancelado' && (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleUpdateEstado(t.id, 'Atendido')}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    Atender
                  </button>
                  <button
                    onClick={() => handleUpdateEstado(t.id, 'Cancelado')}
                    className="rounded-lg bg-slate-100 p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                    title="Cancelar"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-400">
            No hay turnos programados para los filtros seleccionados.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Agendar Nuevo Turno</h2>
                <p className="text-xs text-slate-500">Programación de consulta médica</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTurno} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Seleccionar Paciente *</label>
                <select
                  required
                  value={formData.pacienteId}
                  onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">-- Seleccione un paciente --</option>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.apellido}, {p.nombre} (DNI: {p.dni})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Profesional Asignado *</label>
                <select
                  required
                  value={formData.profesionalId}
                  onChange={(e) => {
                    const prof = usuarios.find(u => u.id === e.target.value);
                    setFormData({
                      ...formData,
                      profesionalId: e.target.value,
                      especialidad: prof?.perfilProfesional || 'Clínica Médica',
                    });
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">-- Seleccione profesional --</option>
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre} ({u.perfilProfesional || u.rol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Hora *</label>
                  <input
                    type="time"
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Tipo de Atención</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Consultorio">Consultorio Presencial</option>
                    <option value="Domicilio">Atención Domiciliaria</option>
                    <option value="Telemedicina">Telemedicina Online</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Especialidad</label>
                  <input
                    type="text"
                    value={formData.especialidad}
                    onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Motivo de Consulta</label>
                <input
                  type="text"
                  placeholder="ej: Control clínico, electrocardiograma, receta..."
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-teal-700"
                >
                  Guardar Turno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
