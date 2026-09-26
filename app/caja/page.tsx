'use client';

import React, { useState } from 'react';
import { Wallet, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, CheckCircle2, Receipt, Plus } from 'lucide-react';

export default function CajaPage() {
  const [transactions, setTransactions] = useState([
    { id: 'REC-1049', paciente: 'Carlos Méndez', concepto: 'Copago Consulta Cardiología', monto: 12000, medio: 'Tarjeta Débito', hora: '11:15 hs', estado: 'Cobrado' },
    { id: 'REC-1050', paciente: 'Valeria Rossi', concepto: 'Práctica Ecografía Abdominal', monto: 28500, medio: 'MercadoPago / QR', hora: '11:40 hs', estado: 'Cobrado' },
    { id: 'REC-1051', paciente: 'Jorge Benítez', concepto: 'Consulta Particular Urgencia', monto: 20000, medio: 'Efectivo', hora: '12:05 hs', estado: 'Cobrado' },
    { id: 'REC-1052', paciente: 'Lucía Fernández', concepto: 'Yeso y Férula Traumatología', monto: 18000, medio: 'Tarjeta Crédito', hora: '12:20 hs', estado: 'Cobrado' }
  ]);

  const totalRecaudado = transactions.reduce((acc, t) => acc + t.monto, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" /> Facturación Mostrador & Caja
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Caja Diaria & Gestión de Cobranzas</h1>
          <p className="text-emerald-100 text-sm mt-1">Cobro de copagos, emisión de recibos y arqueo de caja en tiempo real</p>
        </div>

        <button className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Registrar Cobro / Recibo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Total Recaudado Hoy</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">${totalRecaudado.toLocaleString('es-AR')}</p>
          <p className="text-xs text-slate-400 mt-1">Caja Abierta: Turno Mañana</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Comprobantes Emitidos</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">${transactions.length}</p>
          <p className="text-xs text-slate-400 mt-1">100% liquidados</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Ticket Promedio</p>
          <p className="text-3xl font-extrabold text-teal-700 mt-1">${(totalRecaudado / transactions.length).toFixed(0)}</p>
          <p className="text-xs text-slate-400 mt-1">Por prestación ambulatoria</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Recibo / ID</th>
              <th className="p-4">Paciente</th>
              <th className="p-4">Concepto / Prestación</th>
              <th className="p-4">Monto</th>
              <th className="p-4">Medio de Pago</th>
              <th className="p-4">Hora</th>
              <th className="p-4 text-right">Comprobante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-mono font-bold text-xs text-slate-700">{t.id}</td>
                <td className="p-4 font-bold text-slate-900">{t.paciente}</td>
                <td className="p-4 text-slate-700 text-xs">{t.concepto}</td>
                <td className="p-4 font-extrabold text-emerald-700">${t.monto.toLocaleString('es-AR')}</td>
                <td className="p-4 text-xs font-semibold text-slate-600">{t.medio}</td>
                <td className="p-4 text-xs text-slate-500">{t.hora}</td>
                <td className="p-4 text-right">
                  <button className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 inline-flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5" /> Ver Recibo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
