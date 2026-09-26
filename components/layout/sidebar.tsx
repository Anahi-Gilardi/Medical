'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Siren,
  FileText,
  Baby,
  Syringe,
  FlaskConical,
  Building2,
  Video,
  Calculator,
  Activity,
  Bot,
  AlertTriangle,
  Pill,
  Package,
  Wallet,
  Receipt,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  Settings,
  Globe,
  LogOut,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navCategories = [
    {
      title: 'Clínica & Asistencia',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Pacientes', href: '/pacientes', icon: Users },
        { name: 'Agenda & Visitas', href: '/agenda', icon: Calendar },
        { name: 'Guardia & Urgencias', href: '/emergencias', icon: Siren, badge: 'URGENTE', badgeColor: 'bg-red-500 text-white' },
        { name: 'Evolución SOAP', href: '/evolucion', icon: FileText },
        { name: 'Pediatría & OMS', href: '/pediatria', icon: Baby },
        { name: 'Vacunación', href: '/vacunacion', icon: Syringe },
        { name: 'Estudios & Lab', href: '/estudios', icon: FlaskConical },
        { name: 'Dispensario APS', href: '/dispensario', icon: Building2 },
        { name: 'Telemedicina', href: '/telemedicina', icon: Video }
      ]
    },
    {
      title: 'Herramientas & IA',
      items: [
        { name: 'Calculadora Médica', href: '/calculadora', icon: Calculator },
        { name: 'Escalas Clínicas', href: '/escalas', icon: Activity },
        { name: 'Asistente IA', href: '/asistente-ia', icon: Bot, badge: 'IA', badgeColor: 'bg-emerald-500 text-white' },
        { name: 'Alertas Críticas', href: '/alertas', icon: AlertTriangle, badge: '3', badgeColor: 'bg-amber-500 text-white' }
      ]
    },
    {
      title: 'Farmacia & Finanzas',
      items: [
        { name: 'Recetas & Vademécum', href: '/recetas', icon: Pill },
        { name: 'Farmacia & Stock', href: '/inventario', icon: Package },
        { name: 'Caja Diaria', href: '/caja', icon: Wallet },
        { name: 'Facturación & Obras', href: '/facturacion', icon: Receipt },
        { name: 'Finanzas & Balance', href: '/finanzas', icon: TrendingUp }
      ]
    },
    {
      title: 'Gestión & Auditoría',
      items: [
        { name: 'Equipo & RRHH', href: '/rrhh', icon: UserCheck },
        { name: 'Auditoría & Legal', href: '/auditoria', icon: ShieldCheck },
        { name: 'Configuración', href: '/configuracion', icon: Settings }
      ]
    },
    {
      title: 'Servicios Externos',
      items: [
        { name: 'Portal Paciente', href: '/portal', icon: Globe }
      ]
    }
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none">
      <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/40">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
          <Stethoscope className="w-6 h-6 text-slate-950" />
        </div>
        <div>
          <h1 className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
            MediCare <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">PRO v2</span>
          </h1>
          <p className="text-xs text-slate-400">Enterprise Medical Suite</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {navCategories.map((group, idx) => (
          <div key={idx}>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-teal-500 text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 border border-slate-800">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.nombre?.[0] || 'U'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user?.nombre || 'Dr. Usuario'}</p>
              <p className="text-[10px] text-teal-400 capitalize">{user?.rol || 'SuperAdmin'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
