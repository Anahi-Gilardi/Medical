'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Stethoscope,
  ShieldCheck,
  Settings,
  LogOut,
  HeartPulse
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Pacientes',
    href: '/pacientes',
    icon: Users,
  },
  {
    label: 'Agenda y Turnos',
    href: '/agenda',
    icon: Calendar,
    badge: 'Hoy',
  },
  {
    label: 'Evolución y Signos',
    href: '/pacientes',
    icon: Stethoscope,
  },
  {
    label: 'Recetas Médicas',
    href: '/recetas',
    icon: FileText,
  },
  {
    label: 'Equipo y Roles',
    href: '/equipo',
    icon: ShieldCheck,
  },
  {
    label: 'Configuración',
    href: '/configuracion',
    icon: Settings,
  },
];

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname();
  const { user, logout, clinicaActiva } = useAuth();

  return (
    <aside
      className={
        'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 md:translate-x-0 ' +
        (isOpen ? 'translate-x-0' : '-translate-x-full')
      }
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white shadow-sm shadow-teal-500/30">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-tight text-base">MediCare</span>
              <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700 ring-1 ring-inset ring-teal-600/20">
                PRO v2
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[140px]">
              {clinicaActiva?.nombre || 'Gestión Clínica'}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Módulos Clínicos
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={
                  'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-500/10'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                }
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={
                      'h-4 w-4 transition-colors ' +
                      (isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600')
                    }
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-3 bg-slate-50/50">
        <div className="flex items-center justify-between gap-3 rounded-lg p-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
              {user?.nombre ? user.nombre.split(' ').map(n => n[0]).slice(0, 2).join('') : 'DR'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900">
                {user?.nombre || 'Usuario'}
              </p>
              <p className="truncate text-[11px] text-teal-600 font-medium">
                {user?.rol || 'SuperAdmin'} {user?.matricula ? '· ' + user.matricula : ''}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="rounded p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
