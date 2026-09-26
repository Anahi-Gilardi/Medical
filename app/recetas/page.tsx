'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Pill,
  Search,
  X,
  PlusCircle,
  Trash2
} from 'lucide-react';
import { StorageService } from '@/lib/storage-service';
import { Receta, Paciente, MedicamentoReceta } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

export default function RecetasPage() {
  const { user } = useAuth();
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    pacienteId: '',
    diagnostico: '',
    observaciones: '',
  });

  const [medicamentos, setMedicamentos] = useState<Omit<MedicamentoReceta, 'id'>[]>([
    {
      nombreComercial: '',
      principioActivo: '',
      presentacion: '',
      dosis: '',
      frecuencia: '',
      duracion: '',
      indicaciones: '',
    }
  ]);

  const loadData = () => {
    setRecetas(StorageService.getRecetas());
    setPacientes(StorageService.getPacientes());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddMedItem = () => {
    setMedicamentos([
      ...medicamentos,
      {
        nombreComercial: '',
        principioActivo: '',
        presentacion: '',
        dosis: '',
        frecuencia: '',
        duracion: '',
        indicaciones: '',
      }
    ]);
  };

  const handleRemoveMedItem = (index: number) => {
    setMedicamentos(medicamentos.filter((_, i) => i !== index));
  };

  const handleMedChange = (index: number, field: string, value: string) => {
    const updated = [...medicamentos];
    (updated[index] as any)[field] = value;
    setMedicamentos(updated);
  };

  const handleCreateReceta = (e: React.FormEvent) => {
    e.preventDefault();
    const p = pacientes.find(item => item.id === formData.pacienteId);
    if (!p || !formData.diagnostico || medicamentos.length === 0) return;

    StorageService.addReceta({
      pacienteId: p.id,
      pacienteNombre: p.apellido + ', ' + p.nombre,
      pacienteDni: p.dni,
      profesionalNombre: user?.nombre || 'Dr. Alejandro Martinez',
      matricula: user?.matricula || 'MN 114820',
      diagnostico: formData.diagnostico,
      observaciones: formData.observaciones,
      estado: 'Activa',
      medicamentos: medicamentos.map((m, idx) => ({
        ...m,
        id: 'm_' + Date.now() + '_' + idx,
      })),
    });

    loadData();
    setShowModal(false);
  };

  const filtered = recetas.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.pacienteNombre.toLowerCase().includes(term) ||
      r.pacienteDni.includes(term) ||
      r.diagnostico.toLowerCase().includes(term) ||
      r.medicamentos.some(m => m.nombreComercial.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Recetas y Prescripción Médica</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Emisión de recetas electrónicas con firma digital y trazabilidad farmacológica
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Emitir Nueva Receta
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por paciente, DNI, diagnóstico o medicamento..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <Link href={'/pacientes/' + r.pacienteId} className="font-bold text-slate-900 hover:text-teal-700 text-sm">
                  {r.pacienteNombre}
                </Link>
                <p className="text-xs text-slate-500 font-mono">DNI {r.pacienteDni}</p>
                <p className="text-xs font-semibold text-teal-700 mt-1">Dx: {r.diagnostico}</p>
              </div>
              <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-semibold text-teal-800">
                {r.estado}
              </span>
            </div>

            <div className="space-y-2">
              {r.medicamentos.map((m) => (
                <div key={m.id} className="rounded-xl bg-slate-50 p-2.5 text-xs border border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Pill className="h-3.5 w-3.5 text-teal-600" />
                    <span>{m.nombreComercial}</span>
                    {m.presentacion && <span className="text-slate-400 font-normal">({m.presentacion})</span>}
                  </div>
                  <p className="text-slate-600 mt-0.5 pl-5 text-[11px]">
                    Dosis: {m.dosis} · Frecuencia: {m.frecuencia} · Duración: {m.duracion}
                  </p>
                  {m.indicaciones && <p className="text-slate-500 italic pl-5 text-[11px]">{m.indicaciones}</p>}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-50">
              <span>Médico: {r.profesionalNombre} ({r.matricula})</span>
              <span>Fecha: {r.fecha}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-400">
            No se encontraron recetas emitidas.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Emitir Nueva Receta Digital</h2>
                <p className="text-xs text-slate-500">Prescripción con firma digital y matrícula</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReceta} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Paciente *</label>
                  <select
                    required
                    value={formData.pacienteId}
                    onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="">-- Seleccionar Paciente --</option>
                    {pacientes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.apellido}, {p.nombre} (DNI: {p.dni})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700">Diagnóstico / CIE-10 *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej: I10 - Hipertensión Primaria"
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Medicamentos a Prescribir
                  </span>
                  <button
                    type="button"
                    onClick={handleAddMedItem}
                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold"
                  >
                    <PlusCircle className="h-3.5 w-3.5" /> Agregar Fármaco
                  </button>
                </div>

                {medicamentos.map((med, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-3 relative">
                    {medicamentos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedItem(index)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium">Nombre Comercial / Principio Activo *</label>
                        <input
                          type="text"
                          required
                          placeholder="ej: Amoxicilina 500mg"
                          value={med.nombreComercial}
                          onChange={(e) => handleMedChange(index, 'nombreComercial', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium">Presentación</label>
                        <input
                          type="text"
                          placeholder="ej: Caja x 16 comprimidos"
                          value={med.presentacion}
                          onChange={(e) => handleMedChange(index, 'presentacion', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium">Dosis</label>
                        <input
                          type="text"
                          placeholder="1 comprimido"
                          value={med.dosis}
                          onChange={(e) => handleMedChange(index, 'dosis', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium">Frecuencia</label>
                        <input
                          type="text"
                          placeholder="Cada 8 horas"
                          value={med.frecuencia}
                          onChange={(e) => handleMedChange(index, 'frecuencia', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium">Duración</label>
                        <input
                          type="text"
                          placeholder="7 días"
                          value={med.duracion}
                          onChange={(e) => handleMedChange(index, 'duracion', e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium">Indicaciones Específicas</label>
                      <input
                        type="text"
                        placeholder="Tomar después de las comidas..."
                        value={med.indicaciones}
                        onChange={(e) => handleMedChange(index, 'indicaciones', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Observaciones Generales</label>
                <textarea
                  rows={2}
                  placeholder="Pautas de alarma o instrucciones adicionales..."
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
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
                  Emitir y Firmar Receta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
