'use client';

import React from 'react';
import {
  Database,
  RefreshCw,
  Building,
  Key
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

export default function ConfiguracionPage() {
  const { clinicaActiva } = useAuth();

  const handleResetDemoData = () => {
    if (confirm('¿Deseas restablecer los datos de prueba a su estado original?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Configuración del Sistema</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Ajustes de infraestructura, base de datos en la nube y despliegue en Vercel
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Estado de Conexión a Base de Datos</h2>
            <p className="text-xs text-slate-500">Configuración de persistencia en la nube (Supabase / PostgreSQL)</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <div>
              <p className="text-xs font-bold text-slate-800">
                {isSupabaseConfigured ? 'Supabase PostgreSQL Conectado' : 'Modo Almacenamiento Local / Demo'}
              </p>
              <p className="text-[11px] text-slate-500">
                {isSupabaseConfigured
                  ? 'Todas las transacciones se sincronizan en tiempo real con la nube.'
                  : 'Operando con Local Storage en memoria y caché persistente para Vercel.'}
              </p>
            </div>
          </div>
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            {isSupabaseConfigured ? 'Producción Nube' : 'Listo para Vercel'}
          </span>
        </div>

        <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4 text-xs text-slate-700 space-y-2">
          <p className="font-bold text-teal-900 flex items-center gap-1.5">
            <Key className="h-4 w-4 text-teal-600" />
            Cómo configurar variables en Vercel (Opcional)
          </p>
          <p className="text-slate-600 leading-relaxed">
            Para conectar tu proyecto de Vercel con una base de datos real de Supabase, ve a tu panel en{' '}
            <strong>Vercel ➔ Project ➔ Settings ➔ Environment Variables</strong> y agrega:
          </p>
          <div className="rounded-lg bg-slate-900 p-3 text-[11px] font-mono text-teal-300 space-y-1">
            <p>NEXT_PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Datos de la Institución</h2>
            <p className="text-xs text-slate-500">Clínica activa en la sesión actual</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Nombre de la Clínica</label>
            <p className="font-bold text-slate-900 mt-1 text-sm">{clinicaActiva?.nombre}</p>
          </div>
          <div>
            <label className="block font-semibold text-slate-500 uppercase tracking-wider text-[10px]">CUIT / Identificación Fiscal</label>
            <p className="font-bold text-slate-900 mt-1 text-sm">{clinicaActiva?.cuit}</p>
          </div>
          <div>
            <label className="block font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Dirección</label>
            <p className="text-slate-700 mt-1">{clinicaActiva?.direccion}</p>
          </div>
          <div>
            <label className="block font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Teléfono</label>
            <p className="text-slate-700 mt-1">{clinicaActiva?.telefono}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Restablecer Datos Locales</h2>
            <p className="text-xs text-slate-500">Restaura todos los pacientes, turnos y recetas a los valores de demostración iniciales.</p>
          </div>
          <button
            onClick={handleResetDemoData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
            Restablecer Demo
          </button>
        </div>
      </div>
    </div>
  );
}
