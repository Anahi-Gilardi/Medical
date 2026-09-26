const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✔ Generated: ' + filePath);
}

// ==========================================
// 1. AI Assistant Modal Component
// ==========================================
write('components/ai-assistant-modal.tsx', `'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Activity } from 'lucide-react';

export function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '¡Hola! Soy tu Asistente Clínico IA de MediCare Pro. ¿En qué puedo ayudarte hoy? Puedes consultarme sobre dosis farmacológicas, interacciones medicamentosas, criterios diagnósticos o resúmenes de guías clínicas.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');
    setLoading(true);

    setTimeout(() => {
      let reply = 'He analizado tu consulta clínica. Se sugiere evaluar parámetros hemodinámicos, verificar antecedentes y comprobar interacciones en el módulo de farmacia.';
      const lower = userText.toLowerCase();
      if (lower.includes('dosis') || lower.includes('amoxi') || lower.includes('paracetamol')) {
        reply = '📋 **Guía Posológica**: Amoxicilina dosis habitual: 500-875 mg c/8-12h VO (Pediatría: 40-50 mg/kg/día en 3 tomas). Paracetamol: 500-1000 mg c/6-8h VO (máx 4g/día en adultos, 10-15 mg/kg/dosis en niños).';
      } else if (lower.includes('interaccion') || lower.includes('farmaco')) {
        reply = '⚠️ **Análisis de Interacciones**: No se detectan contraindicaciones absolutas con el esquema de base registrado. Monitorear función renal y espaciar protectores gástricos por al menos 2 horas.';
      } else if (lower.includes('glasgow') || lower.includes('escala')) {
        reply = '📊 **Escala de Glasgow**: Evalúa Respuesta Ocular (1-4), Verbal (1-5) y Motora (1-6). Score total 3-15. Un puntaje <= 8 indica gravedad y requiere asegurar vía aérea.';
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setLoading(false);
    }, 800);
  };

  const quickPrompts = [
    'Interacciones con Enalapril',
    'Dosis pediátrica de Ibuprofeno',
    'Criterios CURB-65 para Neumonía'
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-medium text-sm border-2 border-white/20"
      >
        <Bot className="w-5 h-5 animate-pulse text-white" />
        <span className="hidden sm:inline font-semibold">Asistente Clínico IA</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl h-[580px] flex flex-col overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    MediCare Clinical AI <Sparkles className="w-4 h-4 text-emerald-300" />
                  </h3>
                  <p className="text-xs text-emerald-100">Soporte a la decisión médica basada en evidencia</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={\`flex gap-3 \${m.sender === 'user' ? 'justify-end' : 'justify-start'}\`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={\`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed \${
                      m.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                    }\`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 items-center text-slate-500 text-xs italic">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center animate-spin">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span>Analizando literatura clínica y guías médicas...</span>
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 flex gap-2 overflow-x-auto text-xs">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(p)}
                  className="bg-white px-2.5 py-1 rounded-full border border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-700 whitespace-nowrap transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Escribe tu consulta médica o fármaco..."
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
`);

// ==========================================
// 2. Sidebar Navigation Component
// ==========================================
write('components/layout/sidebar.tsx', `'use client';

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
                    className={\`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all \${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }\`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={\`w-4 h-4 \${isActive ? 'text-white' : 'text-slate-400'}\`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={\`text-[10px] font-bold px-1.5 py-0.5 rounded-full \${item.badgeColor || 'bg-teal-500 text-white'}\`}>
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
`);

// ==========================================
// 3. App Shell
// ==========================================
write('components/layout/app-shell.tsx', `'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import { AiAssistantModal } from '@/components/ai-assistant-modal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/portal') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-600 font-medium">Cargando MediCare Pro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
      <AiAssistantModal />
    </div>
  );
}
`);

console.log('✔ Part 1 completed successfully.');