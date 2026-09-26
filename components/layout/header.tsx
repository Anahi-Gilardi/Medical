'use client';

import React from 'react';
import { Menu, Building, Plus } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { isSupabaseConfigured } from '@/lib/supabase';
import Link from 'next/link';

export const Header: React.FC<{ onMenuToggle?: () => void }> = ({ onMenuToggle }) => {
  const { user, clinicaActiva } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
          <Building className="h-4 w-4 text-teal-600" />
          <span className="font-semibold text-slate-800">{clinicaActiva?.nombre || 'Sede Central'}</span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500">Gestión Integral</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{isSupabaseConfigured ? 'Supabase Conectado' : 'Modo Local / Demo'}</span>
        </div>

        <Link
          href="/pacientes?nuevo=true"
          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Nuevo Paciente</span>
        </Link>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800">
            {user?.nombre ? user.nombre.charAt(0) : 'U'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">{user?.nombre || 'SuperAdmin'}</p>
            <p className="text-[11px] text-slate-400 leading-tight">{user?.rol || 'Administrador'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
