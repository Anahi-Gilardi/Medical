'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartPulse, Lock, User, ShieldCheck, ArrowRight, Stethoscope, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Rol } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginDemo } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const res = await login(username, password);
    setSubmitting(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.message || 'Error al iniciar sesión');
    }
  };

  const handleQuickDemo = (rol: Rol) => {
    loginDemo(rol);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/25">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">MediCare Enterprise PRO</h1>
          <p className="mt-1 text-sm text-slate-400">Sistema Integral de Gestión Clínica y Hospitalaria</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Usuario o Login
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Contraseña
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/20 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50"
            >
              {submitting ? 'Verificando...' : 'Iniciar Sesión'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <p className="mb-3 text-center text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              Acceso Rápido Demo (1 clic)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickDemo('SuperAdmin')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                SuperAdmin
              </button>
              <button
                onClick={() => handleQuickDemo('Medico')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Stethoscope className="h-3.5 w-3.5 text-cyan-400" />
                Médico
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          MediCare Enterprise PRO · Compatible con Vercel y Supabase
        </p>
      </div>
    </div>
  );
}
