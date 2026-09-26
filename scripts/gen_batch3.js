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
// 15. Farmacia & Inventario (app/inventario/page.tsx)
// ==========================================
write('app/inventario/page.tsx', `'use client';

import React, { useState } from 'react';
import { Package, Search, Plus, AlertTriangle, CheckCircle2, ArrowUpDown, Filter, ShieldAlert } from 'lucide-react';

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const [items, setItems] = useState([
    { id: 'MED-101', nombre: 'Amoxicilina 500mg (Cps)', categoria: 'Antibióticos', stock: 480, min: 100, lote: 'AMX-2026-A', venc: '10/2027', ubicacion: 'Farmacia Central', estado: 'Normal' },
    { id: 'MED-102', nombre: 'Paracetamol 1g (Comp)', categoria: 'Analgésicos', stock: 1200, min: 200, lote: 'PCT-9912', venc: '08/2028', ubicacion: 'Farmacia Central', estado: 'Normal' },
    { id: 'MED-103', nombre: 'Enalapril 10mg (Comp)', categoria: 'Cardiovascular', stock: 45, min: 80, lote: 'ENP-4401', venc: '12/2026', ubicacion: 'Guardia Box 1', estado: 'Bajo Stock' },
    { id: 'DES-201', nombre: 'Solución Fisiológica 500ml', categoria: 'Sueros / Fluidos', stock: 320, min: 150, lote: 'FIS-1092', venc: '04/2027', ubicacion: 'Shock Room', estado: 'Normal' },
    { id: 'DES-202', nombre: 'Jeringas descartables 5ml c/aguja', categoria: 'Descartables', stock: 15, min: 100, lote: 'JER-8821', venc: '11/2029', ubicacion: 'Enfermería', estado: 'Crítico' },
    { id: 'MED-104', nombre: 'Morfina 10mg/ml Ampollas', categoria: 'Estupefacientes', stock: 24, min: 10, lote: 'MOR-3312', venc: '05/2027', ubicacion: 'Caja Fuerte Guardia', estado: 'Controlado' }
  ]);

  const filteredItems = items.filter(i =>
    i.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" /> Farmacia & Gestión de Insumos
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Stock, Inventario & Trazabilidad de Lotes</h1>
          <p className="text-teal-100 text-sm mt-1">Control de medicamentos, insumos críticos, alertas de stock mínimo y vencimientos</p>
        </div>

        <button className="bg-white text-teal-800 hover:bg-teal-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Registrar Ingreso / Ajuste
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por fármaco, descartable o lote..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Total ítems: <strong className="text-slate-900">{filteredItems.length}</strong>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Código / ID</th>
              <th className="p-4">Descripción del Fármaco / Insumo</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Stock Actual</th>
              <th className="p-4">Lote / Vencimiento</th>
              <th className="p-4">Ubicación</th>
              <th className="p-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-mono font-bold text-xs text-slate-700">{item.id}</td>
                <td className="p-4 font-bold text-slate-900">{item.nombre}</td>
                <td className="p-4 text-xs font-semibold text-slate-600">{item.categoria}</td>
                <td className="p-4">
                  <span className="font-extrabold text-slate-900">{item.stock}</span>
                  <span className="text-xs text-slate-400 font-normal ml-1">/ min {item.min}</span>
                </td>
                <td className="p-4 text-xs text-slate-700">
                  <p className="font-semibold text-slate-800">{item.lote}</p>
                  <p className="text-slate-400">Venc: {item.venc}</p>
                </td>
                <td className="p-4 text-xs font-medium text-slate-600">{item.ubicacion}</td>
                <td className="p-4">
                  {item.estado === 'Normal' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Normal
                    </span>
                  )}
                  {item.estado === 'Bajo Stock' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      <AlertTriangle className="w-3 h-3 text-amber-600" /> Bajo Stock
                    </span>
                  )}
                  {item.estado === 'Crítico' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                      <AlertTriangle className="w-3 h-3 text-red-600" /> Crítico
                    </span>
                  )}
                  {item.estado === 'Controlado' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      <ShieldAlert className="w-3 h-3 text-purple-600" /> Controlado
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`);

// ==========================================
// 16. Caja Diaria & Cobranzas (app/caja/page.tsx)
// ==========================================
write('app/caja/page.tsx', `'use client';

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
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">\${totalRecaudado.toLocaleString('es-AR')}</p>
          <p className="text-xs text-slate-400 mt-1">Caja Abierta: Turno Mañana</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Comprobantes Emitidos</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">\${transactions.length}</p>
          <p className="text-xs text-slate-400 mt-1">100% liquidados</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Ticket Promedio</p>
          <p className="text-3xl font-extrabold text-teal-700 mt-1">\${(totalRecaudado / transactions.length).toFixed(0)}</p>
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
                <td className="p-4 font-extrabold text-emerald-700">\${t.monto.toLocaleString('es-AR')}</td>
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
`);

// ==========================================
// 17. Facturación & Obras Sociales (app/facturacion/page.tsx)
// ==========================================
write('app/facturacion/page.tsx', `'use client';

import React from 'react';
import { Receipt, Building2, CheckCircle2, Clock, AlertCircle, Download, Plus } from 'lucide-react';

export default function FacturacionPage() {
  const billingBatches = [
    { id: 'LOTE-2026-09A', obraSocial: 'OSDE', prestaciones: 184, total: 3420000, estado: 'Liquidada', fecha: '20/09/2026' },
    { id: 'LOTE-2026-09B', obraSocial: 'Swiss Medical', prestaciones: 96, total: 1950000, estado: 'En Auditoría', fecha: '22/09/2026' },
    { id: 'LOTE-2026-09C', obraSocial: 'PAMI', prestaciones: 312, total: 4800000, estado: 'Presentada', fecha: '24/09/2026' },
    { id: 'LOTE-2026-09D', obraSocial: 'Galeno', prestaciones: 74, total: 1350000, estado: 'Liquidada', fecha: '25/09/2026' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5" /> Convenios & Obras Sociales
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Facturación de Prestaciones & Nomenclador</h1>
          <p className="text-blue-100 text-sm mt-1">Generación de lotes electrónicos, auditoría de débitos y liquidaciones</p>
        </div>

        <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Generar Lote de Facturación
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Lote / ID</th>
              <th className="p-4">Financiador / Obra Social</th>
              <th className="p-4">Cantidad Prestaciones</th>
              <th className="p-4">Importe Total</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Fecha Presentación</th>
              <th className="p-4 text-right">Exportar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {billingBatches.map(b => (
              <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-mono font-bold text-xs text-slate-700">{b.id}</td>
                <td className="p-4 font-bold text-slate-900">{b.obraSocial}</td>
                <td className="p-4 text-slate-600 font-semibold">{b.prestaciones} consultas/prácticas</td>
                <td className="p-4 font-extrabold text-blue-900">\${b.total.toLocaleString('es-AR')}</td>
                <td className="p-4">
                  {b.estado === 'Liquidada' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Liquidada
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {b.estado}
                    </span>
                  )}
                </td>
                <td className="p-4 text-xs text-slate-500">{b.fecha}</td>
                <td className="p-4 text-right">
                  <button className="text-blue-700 hover:text-blue-900 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 inline-flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> TXT / Excel
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
`);

// ==========================================
// 18. Finanzas & Balance (app/finanzas/page.tsx)
// ==========================================
write('app/finanzas/page.tsx', `'use client';

import React from 'react';
import { TrendingUp, DollarSign, Users, Activity, BarChart3, PieChart } from 'lucide-react';

export default function FinanzasPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Tablero de Control Ejecutivo
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Finanzas Clínicas, Rentabilidad & Balance</h1>
          <p className="text-emerald-100 text-sm mt-1">Evolución de ingresos, costos operativos y distribución por especialidad médica</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Facturación Bruta Mes</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">$11.520.000</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1">↑ +14.2% vs mes anterior</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Costos Operativos & Insumos</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">$4.830.000</p>
          <p className="text-xs text-slate-500 mt-1">Dentro del presupuesto</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Margen Operativo Neto</p>
          <p className="text-2xl font-extrabold text-teal-700 mt-1">58.1%</p>
          <p className="text-xs text-teal-600 font-semibold mt-1">Alta rentabilidad clínica</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Honorarios Profesionales</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">$3.950.000</p>
          <p className="text-xs text-indigo-600 font-semibold mt-1">Liquidado a 18 médicos</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b pb-3">Distribución de Ingresos por Especialidad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Guardia & Emergencias</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$4.200.000 <span className="text-xs text-slate-500 font-normal">(36%)</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Cardiología & Estudios</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$3.100.000 <span className="text-xs text-slate-500 font-normal">(27%)</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Clínica Médica</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$2.450.000 <span className="text-xs text-slate-500 font-normal">(21%)</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-xs font-bold text-slate-500 uppercase">Pediatría & Vacunatorio</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$1.770.000 <span className="text-xs text-slate-500 font-normal">(16%)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// ==========================================
// 19. Recursos Humanos & Equipo (app/rrhh/page.tsx)
// ==========================================
write('app/rrhh/page.tsx', `'use client';

import React from 'react';
import { UserCheck, Stethoscope, ShieldCheck, Plus, Mail, Phone, Calendar } from 'lucide-react';

export default function RrhhPage() {
  const staff = [
    { id: 1, nombre: 'Dr. Roberto Gómez', rol: 'Médico Cardiólogo / Jefe Guardia', matricula: 'MN 114.890', guardia: 'Lunes y Miércoles 08:00 - 20:00', estado: 'En Servicio' },
    { id: 2, nombre: 'Dra. María Paz', rol: 'Médica Traumatóloga', matricula: 'MN 128.902', guardia: 'Martes y Jueves 08:00 - 16:00', estado: 'En Servicio' },
    { id: 3, nombre: 'Dr. Lucas Varela', rol: 'Médico Pediatra', matricula: 'MN 135.401', guardia: 'Lunes a Viernes 14:00 - 20:00', estado: 'Disponible' },
    { id: 4, nombre: 'Lic. Claudia Morales', rol: 'Enfermera Jefa', matricula: 'ENF 8.902', guardia: 'Guardia Rotativa 12x36', estado: 'En Servicio' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-800 via-teal-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Cuerpo Médico & Staff
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Recursos Humanos, Guardias & Profesionales</h1>
          <p className="text-slate-200 text-sm mt-1">Gestión de matrículas, asignación de turnos de guardia y disponibilidad</p>
        </div>

        <button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Agregar Profesional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map(s => (
          <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{s.nombre}</h3>
                <p className="text-xs font-semibold text-teal-700">{s.rol}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Matrícula: {s.matricula}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {s.estado}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p className="text-slate-500 font-medium">Horario de Guardia / Atención:</p>
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" /> {s.guardia}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ==========================================
// 20. Auditoría Médica & Legal (app/auditoria/page.tsx)
// ==========================================
write('app/auditoria/page.tsx', `'use client';

import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, FileText, Download } from 'lucide-react';

export default function AuditoriaPage() {
  const auditLogs = [
    { id: 'LOG-88912', timestamp: '26/09/2026 11:32:05', usuario: 'Dr. Roberto Gómez (Cardiología)', accion: 'Firma y Emisión de Receta', paciente: 'Carlos Méndez (DNI 24.891.002)', ip: '192.168.1.45', hash: 'SHA256:7f8a91c...' },
    { id: 'LOG-88911', timestamp: '26/09/2026 11:20:12', usuario: 'Dra. María Paz (Traumatología)', accion: 'Evolución Médica SOAP Guardada', paciente: 'Valeria Rossi (DNI 32.110.405)', ip: '192.168.1.52', hash: 'SHA256:3b42ef8...' },
    { id: 'LOG-88910', timestamp: '26/09/2026 10:45:00', usuario: 'Recepción Guardia (Valeria S.)', accion: 'Triaje Manchester Ingresado', paciente: 'Carlos Méndez (DNI 24.891.002)', ip: '192.168.1.10', hash: 'SHA256:90a1bc4...' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Seguridad Jurídica & Trazabilidad
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Registro Inmutable de Auditoría & Consentimientos</h1>
          <p className="text-slate-300 text-sm mt-1">Audit Trail inalterable para cumplimiento de la Ley de Derechos del Paciente e Historia Clínica Digital</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" /> Registro Criptográfico de Operaciones
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Cadena de Bloques e Integridad Verificada
          </span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Timestamp / ID</th>
              <th className="p-4">Usuario Responsable</th>
              <th className="p-4">Acción Realizada</th>
              <th className="p-4">Paciente Afectado</th>
              <th className="p-4">Firma Digital (Hash)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(l => (
              <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{l.timestamp}</p>
                  <p className="font-mono text-slate-400">{l.id}</p>
                </td>
                <td className="p-4 font-bold text-slate-800">{l.usuario}</td>
                <td className="p-4 font-semibold text-teal-800">{l.accion}</td>
                <td className="p-4 text-slate-700">{l.paciente}</td>
                <td className="p-4 font-mono text-slate-500">{l.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`);

// ==========================================
// 21. Portal del Paciente (app/portal/page.tsx)
// ==========================================
write('app/portal/page.tsx', `'use client';

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
`);

console.log('✔ Batch 3 completed successfully.');

