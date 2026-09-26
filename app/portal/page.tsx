'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Stethoscope, Calendar, Pill, FlaskConical, Download, ArrowRight, User } from 'lucide-react';

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
            <Stethoscope className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base">Portal del Paciente MediCare</h1>
            <p className="text-xs text-slate-500">Autogestión de turnos, recetas y estudios clínicos</p>
          </div>
        </div>

        <Link
          href="/login"
          className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-4 py-2 rounded-xl transition-all"
        >
          Acceso Personal Médico →
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto p-6 space-y-6 w-full">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Bienvenido, Carlos Méndez
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Tu Salud y Documentación Médica en un Solo Lugar</h2>
            <p className="text-teal-100 text-xs">DNI: 24.891.002 | Obra Social: OSDE Plan 310</p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Next Turn */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-xl"><Calendar className="w-5 h-5" /></span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Confirmado</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Próximo Turno Médico</h3>
              <p className="text-xs text-slate-500 mt-1">Cardiología - Dr. Roberto Gómez</p>
              <p className="text-sm font-extrabold text-teal-700 mt-2">Mañana, 27 de Septiembre - 10:30 hs</p>
              <p className="text-xs text-slate-400">Consultorio 4 (Sede Central)</p>
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-2.5 bg-purple-100 text-purple-700 rounded-xl"><Pill className="w-5 h-5" /></span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">2 Recetas Activas</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Receta Digital Vigente</h3>
              <p className="text-xs text-slate-500 mt-1">Enalapril 10mg + Atorvastatina 20mg</p>
              <div className="mt-3">
                <button className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Descargar con Código QR
                </button>
              </div>
            </div>
          </div>

          {/* Lab Results */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-xl"><FlaskConical className="w-5 h-5" /></span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Nuevo</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Estudios de Laboratorio</h3>
              <p className="text-xs text-slate-500 mt-1">Hemograma Completo + Perfil Lipídico</p>
              <div className="mt-3">
                <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Descargar Informe Oficial (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
