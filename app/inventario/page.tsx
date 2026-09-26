'use client';

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
