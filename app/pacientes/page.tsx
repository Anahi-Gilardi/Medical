'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Plus,
  AlertCircle,
  FileText,
  Phone,
  X
} from 'lucide-react';
import { StorageService } from '@/lib/storage-service';
import { Paciente } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

function PacientesContent() {
  const { clinicaActiva } = useAuth();
  const searchParams = useSearchParams();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('Todos');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    sexo: 'M' as 'M' | 'F' | 'Otro',
    obraSocial: 'OSDE',
    numeroAfiliado: '',
    telefono: '',
    email: '',
    direccion: '',
    alergias: '',
    antecedentes: '',
    diagnosticoPrincipal: '',
    estado: 'Activo' as Paciente['estado'],
  });

  useEffect(() => {
    setPacientes(StorageService.getPacientes());
    if (searchParams.get('nuevo') === 'true') {
      setShowModal(true);
    }
  }, [searchParams]);

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.dni) return;

    StorageService.savePaciente({
      ...formData,
      clinica: clinicaActiva?.nombre || 'MediCare Central',
    });

    setPacientes(StorageService.getPacientes());
    setShowModal(false);
    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      fechaNacimiento: '',
      sexo: 'M',
      obraSocial: 'OSDE',
      numeroAfiliado: '',
      telefono: '',
      email: '',
      direccion: '',
      alergias: '',
      antecedentes: '',
      diagnosticoPrincipal: '',
      estado: 'Activo',
    });
  };

  const filtered = pacientes.filter((p) => {
    const term = search.toLowerCase();
    const matchSearch =
      p.nombre.toLowerCase().includes(term) ||
      p.apellido.toLowerCase().includes(term) ||
      p.dni.includes(term) ||
      p.obraSocial.toLowerCase().includes(term);
    const matchEstado = filterEstado === 'Todos' || p.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Gestión de Pacientes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Padrón general, historias clínicas y admisiones
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Registrar Nuevo Paciente
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por DNI, Apellido, Nombre u Obra Social..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 text-xs">
          {['Todos', 'Activo', 'Internado', 'Ambulatorio'].map((est) => (
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

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Paciente / DNI</th>
                <th className="py-3.5 px-4">Obra Social / Afiliado</th>
                <th className="py-3.5 px-4">Contacto</th>
                <th className="py-3.5 px-4">Diagnóstico / Alergias</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <Link href={'/pacientes/' + p.id} className="font-semibold text-slate-900 hover:text-teal-700">
                      {p.apellido}, {p.nombre}
                    </Link>
                    <p className="text-[11px] text-slate-400 font-mono">DNI {p.dni} · {p.edad ? p.edad + ' años' : ''}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <p className="font-medium">{p.obraSocial}</p>
                    <p className="text-[11px] text-slate-400">{p.numeroAfiliado || 'Sin Nro'}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <p className="flex items-center gap-1"><Phone className="h-3 w-3 text-slate-400" /> {p.telefono}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[160px]">{p.direccion}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <p className="font-medium text-slate-800 line-clamp-1">{p.diagnosticoPrincipal || 'Chequeo General'}</p>
                    {p.alergias && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        <AlertCircle className="h-3 w-3" /> {p.alergias}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {p.estado}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={'/pacientes/' + p.id}
                      className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Historia Clínica
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No se encontraron pacientes que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Registrar Nuevo Paciente</h2>
                <p className="text-xs text-slate-500">Admisión y ficha médica inicial</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Apellido *</label>
                  <input
                    type="text"
                    required
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">DNI *</label>
                  <input
                    type="text"
                    required
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Sexo</label>
                  <select
                    value={formData.sexo}
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Obra Social / Prepaga</label>
                  <input
                    type="text"
                    value={formData.obraSocial}
                    onChange={(e) => setFormData({ ...formData, obraSocial: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">N° de Afiliado</label>
                  <input
                    type="text"
                    value={formData.numeroAfiliado}
                    onChange={(e) => setFormData({ ...formData, numeroAfiliado: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Teléfono de Contacto</label>
                  <input
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Dirección / Localidad</label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Alergias Conocidas</label>
                <input
                  type="text"
                  placeholder="ej: Penicilina, Ibuprofeno, Yodo"
                  value={formData.alergias}
                  onChange={(e) => setFormData({ ...formData, alergias: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Antecedentes Médicos</label>
                <textarea
                  rows={2}
                  placeholder="ej: HTA, Diabetes, Cirugías previas..."
                  value={formData.antecedentes}
                  onChange={(e) => setFormData({ ...formData, antecedentes: e.target.value })}
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
                  Guardar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PacientesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Cargando módulo de pacientes...</div>}>
      <PacientesContent />
    </Suspense>
  );
}
