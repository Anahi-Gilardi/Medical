import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'MediCare Enterprise PRO - Gestión Clínica Integral',
  description: 'Sistema integral de gestión clínica, admisión de pacientes, turnos médicos, evoluciones e historias clínicas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
