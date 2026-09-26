'use client';

import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Send, User, ShieldCheck } from 'lucide-react';

export default function TelemedicinaPage() {
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Dr. Roberto Gómez', text: 'Buenas tardes Carlos, ¿cómo se siente hoy con la medicación?' },
    { sender: 'Carlos Méndez (Paciente)', text: 'Hola Doctor, mucho mejor, ya no siento opresión en el pecho.' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([...messages, { sender: 'Dr. Roberto Gómez', text: chatMessage }]);
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-teal-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" /> Sala Virtual Segura (WebRTC Encrypted)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Telemedicina & Consultorio Virtual</h1>
          <p className="text-indigo-100 text-sm mt-1">Videoconsulta médica encriptada, chat clínico e indicaciones en vivo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Stage */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col h-[500px]">
          <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-teal-600/20 text-teal-400 border-2 border-teal-500/40 flex items-center justify-center mx-auto text-3xl font-bold shadow-2xl animate-pulse">
                CM
              </div>
              <h3 className="text-white font-bold text-lg">Carlos Méndez (58 años)</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Conectado en línea (HD 1080p)
              </span>
            </div>

            {/* Doctor thumbnail */}
            <div className="absolute top-4 right-4 w-32 h-24 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex items-center justify-center">
              <span className="text-xs font-bold text-slate-300">Tú (Dr. Gómez)</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-4">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-3.5 rounded-full font-bold transition-all ${
                micActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'
              }`}
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCamActive(!camActive)}
              className={`p-3.5 rounded-full font-bold transition-all ${
                camActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'
              }`}
            >
              {camActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => alert('Consulta finalizada con éxito.')}
              className="p-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all font-bold"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat / Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-600" /> Chat de Consulta
            </h3>
            <span className="text-[10px] bg-slate-200 font-bold px-2 py-0.5 rounded text-slate-700">Privado</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1 shadow-sm">
                <p className="font-bold text-teal-800">{m.sender}</p>
                <p className="text-slate-700 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder="Escribe una indicación..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
