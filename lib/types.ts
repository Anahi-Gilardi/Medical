export type Rol = 'SuperAdmin' | 'Admin' | 'Medico' | 'Enfermeria' | 'Operativo' | 'Administrativo' | 'Auditoria';

export interface Usuario {
  id: string;
  usuarioLogin: string;
  nombre: string;
  email: string;
  rol: Rol;
  matricula?: string;
  empresa: string;
  perfilProfesional?: string;
  estado: 'Activo' | 'Bloqueado';
  avatarUrl?: string;
}

export interface SignosVitales {
  presionArterial?: string; // ej: "120/80"
  frecuenciaCardiaca?: number; // lpm
  frecuenciaRespiratoria?: number; // rpm
  temperatura?: number; // °C
  saturacionOxigeno?: number; // %
  glucemia?: number; // mg/dl
  peso?: number; // kg
  fechaHora: string;
  profesional: string;
}

export interface Evolucion {
  id: string;
  pacienteId: string;
  fechaHora: string;
  profesionalNombre: string;
  profesionalRol: string;
  matricula?: string;
  tipoNota: 'Evolución Médica' | 'Control Enfermería' | 'Ingreso' | 'Epicrisis' | 'Guardia';
  evolucionClinica: string;
  indicaciones?: string;
  signosVitales?: SignosVitales;
}

export interface MedicamentoReceta {
  id: string;
  nombreComercial: string;
  principioActivo?: string;
  presentacion: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  indicaciones: string;
}

export interface Receta {
  id: string;
  pacienteId: string;
  pacienteNombre: string;
  pacienteDni: string;
  fecha: string;
  profesionalNombre: string;
  matricula: string;
  diagnostico: string;
  medicamentos: MedicamentoReceta[];
  estado: 'Activa' | 'Dispensada' | 'Cancelada';
  observaciones?: string;
}

export interface Paciente {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  edad?: number;
  sexo: 'M' | 'F' | 'Otro';
  obraSocial: string;
  numeroAfiliado: string;
  telefono: string;
  email?: string;
  direccion: string;
  alergias?: string;
  antecedentes?: string;
  diagnosticoPrincipal?: string;
  estado: 'Activo' | 'Ambulatorio' | 'Internado' | 'Alta';
  clinica: string;
  creadoEn: string;
  ultimaVisita?: string;
}

export interface Turno {
  id: string;
  pacienteId: string;
  pacienteNombre: string;
  pacienteDni: string;
  profesionalId: string;
  profesionalNombre: string;
  especialidad: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
  estado: 'Pendiente' | 'Confirmado' | 'En Sala de Espera' | 'En Consulta' | 'Atendido' | 'Cancelado';
  motivo: string;
  tipo: 'Consultorio' | 'Domicilio' | 'Telemedicina';
  clinica: string;
}

export interface Clinica {
  id: string;
  nombre: string;
  cuit: string;
  direccion: string;
  telefono: string;
  email: string;
}
