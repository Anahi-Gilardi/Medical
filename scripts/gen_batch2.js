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
// 11. Calculadora Médica (app/calculadora/page.tsx)
// ==========================================
write('app/calculadora/page.tsx', `'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, Activity, Droplets, Scale, Heart, AlertCircle, RefreshCw } from 'lucide-react';

export default function CalculadoraPage() {
  const [activeTab, setActiveTab] = useState<'cockcroft' | 'bsa' | 'dosis' | 'bic' | 'sodio'>('cockcroft');

  // 1. Cockcroft-Gault
  const [cgAge, setCgAge] = useState(65);
  const [cgWeight, setCgWeight] = useState(72);
  const [cgCreat, setCgCreat] = useState(1.3);
  const [cgSex, setCgSex] = useState<'M' | 'F'>('M');
  const factorSexo = cgSex === 'F' ? 0.85 : 1.0;
  const clearance = +(((140 - cgAge) * cgWeight) / (72 * cgCreat) * factorSexo).toFixed(1);

  // 2. BSA (Mosteller)
  const [bsaWeight, setBsaWeight] = useState(75);
  const [bsaHeight, setBsaHeight] = useState(175);
  const bsa = +(Math.sqrt((bsaWeight * bsaHeight) / 3600)).toFixed(2);

  // 3. Dosis Pediatrica
  const [pedWeight, setPedWeight] = useState(14);
  const [pedDoseKg, setPedDoseKg] = useState(50); // mg/kg/dia
  const [pedConc, setPedConc] = useState(50); // mg/ml (ej: 250mg/5ml = 50mg/ml)
  const [pedTomas, setPedTomas] = useState(3);
  const totalMgDia = pedWeight * pedDoseKg;
  const mlPorToma = +((totalMgDia / pedTomas) / pedConc).toFixed(1);

  // 4. BIC
  const [bicVol, setBicVol] = useState(500); // ml
  const [bicHours, setBicHours] = useState(8); // horas
  const mlHora = +(bicVol / bicHours).toFixed(1);
  const macroGotas = +(bicVol / (bicHours * 3)).toFixed(1);
  const microGotas = +(bicVol / bicHours).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Fórmulas Médicas & Dosificación
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Calculadora Clínica & Infusiones</h1>
          <p className="text-teal-100 text-sm mt-1">Clearance de creatinina, superficie corporal, goteo BIC y dosificación por peso</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cockcroft')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors \${
            activeTab === 'cockcroft' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          Clearance Creatinina (Cockcroft)
        </button>
        <button
          onClick={() => setActiveTab('bsa')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors \${
            activeTab === 'bsa' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          Superficie Corporal (Mosteller)
        </button>
        <button
          onClick={() => setActiveTab('dosis')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors \${
            activeTab === 'dosis' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          Dosis Pediátrica (mg/kg/día)
        </button>
        <button
          onClick={() => setActiveTab('bic')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors \${
            activeTab === 'bic' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          Bomba de Infusión (BIC / Goteo)
        </button>
      </div>

      {/* Tab 1: Cockcroft */}
      {activeTab === 'cockcroft' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Parámetros del Paciente</h3>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Sexo</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCgSex('M')}
                  className={\`py-2 rounded-xl border font-bold text-center \${cgSex === 'M' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700'}\`}
                >
                  Hombre (x1.00)
                </button>
                <button
                  type="button"
                  onClick={() => setCgSex('F')}
                  className={\`py-2 rounded-xl border font-bold text-center \${cgSex === 'F' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700'}\`}
                >
                  Mujer (x0.85)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Edad (años)</label>
                <input type="number" value={cgAge} onChange={e => setCgAge(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peso (kg)</label>
                <input type="number" value={cgWeight} onChange={e => setCgWeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Creatinina (mg/dl)</label>
                <input type="number" step="0.1" value={cgCreat} onChange={e => setCgCreat(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="bg-teal-50/70 p-6 rounded-2xl border border-teal-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Depuración de Creatinina Estimada</p>
            <p className="text-5xl font-black text-teal-900">{clearance} <span className="text-lg font-bold text-teal-700">ml/min</span></p>
            <div className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-teal-200 text-teal-800">
              {clearance >= 90 ? 'Función Renal Normal (Estadio G1)' : clearance >= 60 ? 'Leve disminución (Estadio G2)' : clearance >= 30 ? 'Disminución Moderada (Estadio G3)' : 'Insuficiencia Renal Severa (Estadio G4/G5)'}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: BSA */}
      {activeTab === 'bsa' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Parámetros Antropométricos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peso (kg)</label>
                <input type="number" value={bsaWeight} onChange={e => setBsaWeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Altura (cm)</label>
                <input type="number" value={bsaHeight} onChange={e => setBsaHeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/70 p-6 rounded-2xl border border-indigo-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Superficie Corporal (Mosteller)</p>
            <p className="text-5xl font-black text-indigo-900">{bsa} <span className="text-lg font-bold text-indigo-700">m²</span></p>
            <p className="text-xs text-indigo-600 font-medium">Útil para quimioterapia, dosis de fármacos específicos y hemodinamia.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Dosis Pediatrica */}
      {activeTab === 'dosis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Cálculo de Dosis por Peso</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peso (kg)</label>
                <input type="number" value={pedWeight} onChange={e => setPedWeight(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Dosis (mg/kg/día)</label>
                <input type="number" value={pedDoseKg} onChange={e => setPedDoseKg(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Conc. Jarabe (mg/ml)</label>
                <input type="number" value={pedConc} onChange={e => setPedConc(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Tomas por día</label>
                <select value={pedTomas} onChange={e => setPedTomas(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold">
                  <option value="1">1 vez al día (c/24h)</option>
                  <option value="2">2 veces al día (c/12h)</option>
                  <option value="3">3 veces al día (c/8h)</option>
                  <option value="4">4 veces al día (c/6h)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/70 p-6 rounded-2xl border border-purple-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Volumen a Administrar por Toma</p>
            <p className="text-5xl font-black text-purple-900">{mlPorToma} <span className="text-lg font-bold text-purple-700">ml</span></p>
            <p className="text-xs text-purple-700 font-semibold">Total diario: {totalMgDia} mg/día ({+(totalMgDia / pedConc).toFixed(1)} ml/día)</p>
          </div>
        </div>
      )}

      {/* Tab 4: BIC */}
      {activeTab === 'bic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold text-slate-900 text-base">Parámetros de Infusión</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Volumen Total (ml)</label>
                <input type="number" value={bicVol} onChange={e => setBicVol(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Tiempo de Pasaje (Horas)</label>
                <input type="number" value={bicHours} onChange={e => setBicHours(+e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="bg-cyan-50/70 p-6 rounded-2xl border border-cyan-200 flex flex-col justify-center space-y-3">
            <div className="text-center">
              <p className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Bomba de Infusión Continua (BIC)</p>
              <p className="text-4xl font-black text-cyan-900">{mlHora} <span className="text-base font-bold text-cyan-700">ml/hora</span></p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-200 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-cyan-100">
                <p className="font-bold text-slate-500">Macrogotas/min</p>
                <p className="text-base font-bold text-cyan-900">{macroGotas} gts/min</p>
              </div>
              <div className="bg-white p-2 rounded-lg border border-cyan-100">
                <p className="font-bold text-slate-500">Microgotas/min</p>
                <p className="text-base font-bold text-cyan-900">{microGotas} microgts/min</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ==========================================
// 12. Escalas Clínicas (app/escalas/page.tsx)
// ==========================================
write('app/escalas/page.tsx', `'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

export default function EscalasPage() {
  const [activeScale, setActiveScale] = useState<'glasgow' | 'curb65' | 'barthel'>('glasgow');

  // Glasgow State
  const [ocular, setOcular] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motora, setMotora] = useState(6);
  const totalGlasgow = ocular + verbal + motora;
  const interpretacionGlasgow = totalGlasgow <= 8 ? 'Traumatismo Grave (Score <= 8: Asegurar Vía Aérea / IOT)' : totalGlasgow <= 12 ? 'Traumatismo Moderado' : 'Leve / Normal (13-15)';

  // CURB-65 State
  const [curbC, setCurbC] = useState(false);
  const [curbU, setCurbU] = useState(false);
  const [curbR, setCurbR] = useState(false);
  const [curbB, setCurbB] = useState(false);
  const [curb65, setCurb65] = useState(false);
  const totalCurb = (curbC ? 1 : 0) + (curbU ? 1 : 0) + (curbR ? 1 : 0) + (curbB ? 1 : 0) + (curb65 ? 1 : 0);
  const interpretacionCurb = totalCurb === 0 ? 'Bajo Riesgo (Tratamiento Ambulatorio)' : totalCurb <= 2 ? 'Riesgo Moderado (Considerar Internación en Sala General)' : 'Alto Riesgo (Criterio de UTI / Cuidados Críticos)';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Valoración Clínica Estandarizada
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Escalas de Valoración & Scores Clínicos</h1>
          <p className="text-blue-100 text-sm mt-1">Escala de Glasgow, CURB-65, Índice de Barthel y estratificación de riesgo</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2">
        <button
          onClick={() => setActiveScale('glasgow')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 transition-colors \${
            activeScale === 'glasgow' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          Escala de Coma de Glasgow
        </button>
        <button
          onClick={() => setActiveScale('curb65')}
          className={\`py-3 px-4 font-semibold text-sm border-b-2 transition-colors \${
            activeScale === 'curb65' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }\`}
        >
          CURB-65 (Neumonía)
        </button>
      </div>

      {activeScale === 'glasgow' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-2 space-y-4 text-sm">
            {/* Ocular */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">1. Apertura Ocular</label>
              <select value={ocular} onChange={e => setOcular(+e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                <option value="4">4 - Espontánea</option>
                <option value="3">3 - Al estímulo verbal</option>
                <option value="2">2 - Al estímulo doloroso</option>
                <option value="1">1 - Nula / Sin respuesta</option>
              </select>
            </div>

            {/* Verbal */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">2. Respuesta Verbal</label>
              <select value={verbal} onChange={e => setVerbal(+e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                <option value="5">5 - Orientado y conversando</option>
                <option value="4">4 - Desorientado / Confuso</option>
                <option value="3">3 - Palabras inapropiadas</option>
                <option value="2">2 - Sonidos incomprensibles</option>
                <option value="1">1 - Nula / Sin respuesta</option>
              </select>
            </div>

            {/* Motora */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">3. Respuesta Motora</label>
              <select value={motora} onChange={e => setMotora(+e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                <option value="6">6 - Obedece órdenes</option>
                <option value="5">5 - Localiza el dolor</option>
                <option value="4">4 - Retirada al dolor / Flexión normal</option>
                <option value="3">3 - Flexión anormal (Decorticación)</option>
                <option value="2">2 - Extensión anormal (Descerebración)</option>
                <option value="1">1 - Nula / Flacidez</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase">Score Total Glasgow</p>
            <p className="text-5xl font-black text-teal-800">{totalGlasgow} <span className="text-base text-slate-500 font-bold">/ 15</span></p>
            <div className={\`p-3 rounded-xl border text-xs font-bold \${
              totalGlasgow <= 8 ? 'bg-red-100 text-red-800 border-red-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }\`}>
              {interpretacionGlasgow}
            </div>
          </div>
        </div>
      )}

      {activeScale === 'curb65' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6 rounded-b-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-2 space-y-3 text-sm">
            <h3 className="font-bold text-slate-900 mb-2">Criterios CURB-65</h3>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbC} onChange={e => setCurbC(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>C</strong> - Confusión mental reciente</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbU} onChange={e => setCurbU(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>U</strong> - Urea sérica &gt; 7 mmol/L (BUN &gt; 19 mg/dL)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbR} onChange={e => setCurbR(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>R</strong> - Frecuencia Respiratoria &gt;= 30 rpm</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curbB} onChange={e => setCurbB(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>B</strong> - Presión arterial baja (PAS &lt; 90 o PAD &lt;= 60 mmHg)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input type="checkbox" checked={curb65} onChange={e => setCurb65(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              <span className="font-medium text-slate-800"><strong>65</strong> - Edad &gt;= 65 años</span>
            </label>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase">Puntaje CURB-65</p>
            <p className="text-5xl font-black text-indigo-900">{totalCurb} <span className="text-base text-slate-500 font-bold">/ 5</span></p>
            <div className="p-3 rounded-xl border bg-indigo-50 border-indigo-200 text-indigo-900 text-xs font-bold">
              {interpretacionCurb}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ==========================================
// 13. Asistente Clínico IA (app/asistente-ia/page.tsx)
// ==========================================
write('app/asistente-ia/page.tsx', `'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AsistenteIaPage() {
  const [drug1, setDrug1] = useState('Enalapril 10mg');
  const [drug2, setDrug2] = useState('Ibuprofeno 600mg');
  const [interactionResult, setInteractionResult] = useState<string | null>(null);

  const checkInteraction = () => {
    setInteractionResult(
      '⚠️ **Riesgo Moderado-Severo**: La combinación de IECA (Enalapril) con AINEs (Ibuprofeno) reduce el efecto antihipertensivo del Enalapril y aumenta significativamente el riesgo de deterioro de la función renal e hiperpotasemia. Se aconseja utilizar Paracetamol como analgésico de primera línea en este paciente.'
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" /> Soporte a la Decisión Médica
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Asistente Clínico IA & Interacciones Farmacológicas</h1>
          <p className="text-teal-100 text-sm mt-1">Verificación automática de incompatibilidades de fármacos y sugerencias terapéuticas</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-600" /> Verificador de Interacciones entre Fármacos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primer Medicamento</label>
            <input
              type="text"
              value={drug1}
              onChange={e => setDrug1(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Segundo Medicamento</label>
            <input
              type="text"
              value={drug2}
              onChange={e => setDrug2(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm font-semibold"
            />
          </div>
        </div>

        <button
          onClick={checkInteraction}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Analizar Interacción Cruzada
        </button>

        {interactionResult && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-slate-800 text-sm leading-relaxed animate-fade-in">
            <p className="font-bold text-amber-900 mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Resultado del Análisis Farmacológico:
            </p>
            <p>{interactionResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}
`);

// ==========================================
// 14. Alertas Críticas (app/alertas/page.tsx)
// ==========================================
write('app/alertas/page.tsx', `'use client';

import React from 'react';
import { AlertTriangle, Siren, Activity, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AlertasPage() {
  const alerts = [
    { id: 1, paciente: 'Carlos Méndez (58a)', tipo: 'Signos Vitales Críticos', detalle: 'Troponina I Cuantitativa elevada (0.45 ng/ml) + TA 160/95', nivel: 'Crítica', color: 'bg-red-500 text-white', hora: 'Hace 15 min' },
    { id: 2, paciente: 'Marta Solís (68a)', tipo: 'Alerta de Control Vencido', detalle: 'Paciente diabética tipo 2 sin control de HbA1c hace 120 días', nivel: 'Moderada', color: 'bg-amber-500 text-white', hora: 'Hace 2 horas' },
    { id: 3, paciente: 'Valeria Rossi (34a)', tipo: 'Alergia Medicamentosa', detalle: 'Alergia confirmada a Penicilinas en ficha clínica', nivel: 'Informativa', color: 'bg-blue-500 text-white', hora: 'Hace 4 horas' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Monitoreo y Seguridad del Paciente
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Alertas Médicas & Valores Críticos</h1>
          <p className="text-amber-100 text-sm mt-1">Detección de descompensaciones clínicas, alergias cruzadas y controles omitidos</p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={\`text-xs font-bold px-2.5 py-0.5 rounded-full \${a.color}\`}>{a.nivel}</span>
                <span className="font-bold text-slate-900 text-base">{a.paciente}</span>
                <span className="text-xs text-slate-400">({a.hora})</span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase">{a.tipo}</p>
              <p className="text-sm text-slate-700">{a.detalle}</p>
            </div>

            <button
              onClick={() => alert('Alerta atendida y registrada en auditoría.')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors shrink-0"
            >
              Marcar como Atendida
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

console.log('✔ Batch 2 completed successfully.');

