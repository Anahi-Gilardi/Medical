'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Mail,
  Award,
  Building,
  CheckCircle,
  X
} from 'lucide-react';
import { StorageService } from '@/lib/storage-service';
import { Usuario, Rol } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

export default function EquipoPage() {
  const { clinicaActiva } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    usuarioLogin: '',
    rol: 'Medico' as Rol,
    matricula: '',
    perfilProfesional: 'Clínica Médica',
  });

  const loadData = () => {
    setUsuarios(StorageService.getUsuarios());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.usuarioLogin) return;

    StorageService.addUsuario({
      ...formData,
      empresa: clinicaActiva?.nombre || 'MediCare Central',
      estado: 'Activo',
    });

    loadData();
    setShowModal(false);
    setFormData({
      nombre: '',
      email: '',
      usuarioLogin: '',
      rol: 'Medico',
      matricula: '',
      perfilProfesional: 'Clínica Médica',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Mi Equipo y Profesionales</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestión de médicos, enfermeros, coordinadores y roles de acceso
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Alta de Profesional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((u) => (
          <div key={u.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 font-bold text-sm">
                  {u.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{u.nombre}</h3>
                  <p className="text-xs text-teal-700 font-medium">{u.perfilProfesional || u.rol}</p>
                </div>
              </div>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-teal-100 text-teal-800">
                {u.rol}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate">{u.email}</span>
              </p>
              {u.matricula && (
                <p className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-slate-400" />
                  <span>Matrícula: <strong>{u.matricula}</strong></span>
                </p>
              )}
              <p className="flex items-center gap-2 text-[11px] text-slate-400">
                <Building className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate">{u.empresa}</span>
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-50 pt-2 text-[11px]">
              <span className="text-slate-400 font-mono">Login: @{u.usuarioLogin}</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> {u.estado}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Alta de Profesional o Usuario</h2>
                <p className="text-xs text-slate-500">Configuración de credenciales y permisos</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Nombre y Apellido *</label>
                <input
                  type="text"
                  required
                  placeholder="ej: Dr. Gabriel Rossi"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Usuario / Login *</label>
                  <input
                    type="text"
                    required
                    placeholder="grossi"
                    value={formData.usuarioLogin}
                    onChange={(e) => setFormData({ ...formData, usuarioLogin: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Email Institucional *</label>
                  <input
                    type="email"
                    required
                    placeholder="grossi@medicare.pro"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700">Rol de Sistema</label>
                  <select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Medico">Médico</option>
                    <option value="Enfermeria">Enfermería</option>
                    <option value="Operativo">Operativo / Recepción</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Matrícula Nacional / Prov.</label>
                  <input
                    type="text"
                    placeholder="MN 123456"
                    value={formData.matricula}
                    onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Especialidad / Perfil Profesional</label>
                <input
                  type="text"
                  placeholder="ej: Traumatología, Terapia Intensiva, Pediatría..."
                  value={formData.perfilProfesional}
                  onChange={(e) => setFormData({ ...formData, perfilProfesional: e.target.value })}
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
                  Registrar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
