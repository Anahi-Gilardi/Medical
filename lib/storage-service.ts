import { Paciente, Evolucion, Turno, Receta, Usuario, Clinica } from './types';
import { INITIAL_PACIENTES, INITIAL_EVOLUCIONES, INITIAL_TURNOS, INITIAL_RECETAS, INITIAL_USUARIOS, INITIAL_CLINICAS } from './mock-data';

const STORAGE_KEYS = {
  PACIENTES: 'medicare_pacientes_v2',
  EVOLUCIONES: 'medicare_evoluciones_v2',
  TURNOS: 'medicare_turnos_v2',
  RECETAS: 'medicare_recetas_v2',
  USUARIOS: 'medicare_usuarios_v2',
  CLINICAS: 'medicare_clinicas_v2',
};

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Error reading ' + key + ' from storage:', error);
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing ' + key + ' to storage:', error);
  }
}

export const StorageService = {
  getPacientes: (): Paciente[] => {
    return getStorage<Paciente[]>(STORAGE_KEYS.PACIENTES, INITIAL_PACIENTES);
  },
  getPacienteById: (id: string): Paciente | undefined => {
    const pacientes = StorageService.getPacientes();
    return pacientes.find(p => p.id === id);
  },
  savePaciente: (paciente: Omit<Paciente, 'id' | 'creadoEn'> & { id?: string }): Paciente => {
    const pacientes = StorageService.getPacientes();
    let updated: Paciente;
    if (paciente.id) {
      updated = {
        ...paciente,
        id: paciente.id,
        creadoEn: pacientes.find(p => p.id === paciente.id)?.creadoEn || new Date().toISOString(),
      } as Paciente;
      const index = pacientes.findIndex(p => p.id === paciente.id);
      if (index !== -1) pacientes[index] = updated;
      else pacientes.unshift(updated);
    } else {
      updated = {
        ...paciente,
        id: 'p_' + Date.now(),
        creadoEn: new Date().toISOString(),
      } as Paciente;
      pacientes.unshift(updated);
    }
    setStorage(STORAGE_KEYS.PACIENTES, pacientes);
    return updated;
  },

  getEvoluciones: (pacienteId?: string): Evolucion[] => {
    const all = getStorage<Evolucion[]>(STORAGE_KEYS.EVOLUCIONES, INITIAL_EVOLUCIONES);
    if (!pacienteId) return all;
    return all.filter(e => e.pacienteId === pacienteId).sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
  },
  addEvolucion: (evolucion: Omit<Evolucion, 'id' | 'fechaHora'>): Evolucion => {
    const evoluciones = getStorage<Evolucion[]>(STORAGE_KEYS.EVOLUCIONES, INITIAL_EVOLUCIONES);
    const newEvo: Evolucion = {
      ...evolucion,
      id: 'e_' + Date.now(),
      fechaHora: new Date().toISOString(),
    };
    evoluciones.unshift(newEvo);
    setStorage(STORAGE_KEYS.EVOLUCIONES, evoluciones);

    const pacientes = StorageService.getPacientes();
    const pIndex = pacientes.findIndex(p => p.id === evolucion.pacienteId);
    if (pIndex !== -1) {
      pacientes[pIndex].ultimaVisita = new Date().toISOString();
      setStorage(STORAGE_KEYS.PACIENTES, pacientes);
    }

    return newEvo;
  },

  getTurnos: (fecha?: string): Turno[] => {
    const turnos = getStorage<Turno[]>(STORAGE_KEYS.TURNOS, INITIAL_TURNOS);
    if (!fecha) return turnos;
    return turnos.filter(t => t.fecha === fecha);
  },
  addTurno: (turno: Omit<Turno, 'id'>): Turno => {
    const turnos = getStorage<Turno[]>(STORAGE_KEYS.TURNOS, INITIAL_TURNOS);
    const newTurno: Turno = {
      ...turno,
      id: 't_' + Date.now(),
    };
    turnos.push(newTurno);
    setStorage(STORAGE_KEYS.TURNOS, turnos);
    return newTurno;
  },
  updateTurnoEstado: (turnoId: string, nuevoEstado: Turno['estado']): void => {
    const turnos = getStorage<Turno[]>(STORAGE_KEYS.TURNOS, INITIAL_TURNOS);
    const index = turnos.findIndex(t => t.id === turnoId);
    if (index !== -1) {
      turnos[index].estado = nuevoEstado;
      setStorage(STORAGE_KEYS.TURNOS, turnos);
    }
  },

  getRecetas: (pacienteId?: string): Receta[] => {
    const recetas = getStorage<Receta[]>(STORAGE_KEYS.RECETAS, INITIAL_RECETAS);
    if (!pacienteId) return recetas;
    return recetas.filter(r => r.pacienteId === pacienteId);
  },
  addReceta: (receta: Omit<Receta, 'id' | 'fecha'>): Receta => {
    const recetas = getStorage<Receta[]>(STORAGE_KEYS.RECETAS, INITIAL_RECETAS);
    const newReceta: Receta = {
      ...receta,
      id: 'r_' + Date.now(),
      fecha: new Date().toISOString().split('T')[0],
    };
    recetas.unshift(newReceta);
    setStorage(STORAGE_KEYS.RECETAS, recetas);
    return newReceta;
  },

  getUsuarios: (): Usuario[] => {
    return getStorage<Usuario[]>(STORAGE_KEYS.USUARIOS, INITIAL_USUARIOS);
  },
  addUsuario: (usuario: Omit<Usuario, 'id'>): Usuario => {
    const usuarios = StorageService.getUsuarios();
    const newU: Usuario = {
      ...usuario,
      id: 'u_' + Date.now(),
    };
    usuarios.push(newU);
    setStorage(STORAGE_KEYS.USUARIOS, usuarios);
    return newU;
  },
  getClinicas: (): Clinica[] => {
    return getStorage<Clinica[]>(STORAGE_KEYS.CLINICAS, INITIAL_CLINICAS);
  }
};
