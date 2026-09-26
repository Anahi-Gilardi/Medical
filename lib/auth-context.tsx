'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario, Clinica, Rol } from './types';
import { INITIAL_USUARIOS, INITIAL_CLINICAS } from './mock-data';

interface AuthContextType {
  user: Usuario | null;
  clinicaActiva: Clinica | null;
  isLoading: boolean;
  login: (username: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginDemo: (rol?: Rol) => void;
  logout: () => void;
  setClinicaActiva: (clinica: Clinica) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'medicare_current_user_v2';
const AUTH_CLINICA_KEY = 'medicare_current_clinica_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [clinicaActiva, setClinicaActivaState] = useState<Clinica | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      const storedClinica = localStorage.getItem(AUTH_CLINICA_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Por defecto en desarrollo / primera visita dejamos al SuperAdmin logueado
        const defaultUser = INITIAL_USUARIOS[0];
        setUser(defaultUser);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(defaultUser));
      }

      if (storedClinica) {
        setClinicaActivaState(JSON.parse(storedClinica));
      } else {
        const defaultClinica = INITIAL_CLINICAS[0];
        setClinicaActivaState(defaultClinica);
        localStorage.setItem(AUTH_CLINICA_KEY, JSON.stringify(defaultClinica));
      }
    } catch (e) {
      console.error('Error loading session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    // Simulación de validación
    const uLimpio = username.trim().toLowerCase();
    
    // Si es admin o coincide con algún usuario de mock
    let found = INITIAL_USUARIOS.find(u => u.usuarioLogin.toLowerCase() === uLimpio);
    if (!found && (uLimpio === 'admin' || uLimpio === 'superadmin')) {
      found = INITIAL_USUARIOS[0];
    }

    if (found) {
      setUser(found);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(found));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, message: 'Usuario o contraseña no válidos.' };
  };

  const loginDemo = (rol: Rol = 'SuperAdmin') => {
    const demoUser = INITIAL_USUARIOS.find(u => u.rol === rol) || INITIAL_USUARIOS[0];
    setUser(demoUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const setClinicaActiva = (clinica: Clinica) => {
    setClinicaActivaState(clinica);
    localStorage.setItem(AUTH_CLINICA_KEY, JSON.stringify(clinica));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        clinicaActiva,
        isLoading,
        login,
        loginDemo,
        logout,
        setClinicaActiva,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
