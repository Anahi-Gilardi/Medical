'use client';

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
                  className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                    }`}
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
