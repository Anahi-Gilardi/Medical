'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import { AiAssistantModal } from '@/components/ai-assistant-modal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/portal') {
    return <>{children}</>;
  }

  if (isLoading) {
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
