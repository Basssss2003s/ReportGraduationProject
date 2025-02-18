// SessionContext.tsx
"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { axiosApi } from './axios';

type SessionData = {
  emailAddress: string;
  passWord: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

type SessionContextType = {
  session: SessionData | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  refreshSession2: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  refreshSession: async () => {},
  refreshSession2: async () => {},
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    try {
      const response = await axiosApi<SessionData>('get', '/auth/profileAdmin');
      setSession(response);
    } catch (error) {
      console.error('ดึงข้อมูล session ไม่สำเร็จ:', error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSession = async () => {
    try {
      const response = await axiosApi<SessionData>('get', '/auth/profile');
      setSession(response);
    } catch (error) {
      console.error('ดึงข้อมูล session ไม่สำเร็จ:', error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
    getSession();
  }, []);

  const refreshSession = async () => {
    setLoading(true);
    await fetchSession();

  };
  const refreshSession2 = async () => {
    setLoading(true);
    await getSession();
  };

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession,refreshSession2 }}>
      {children}
    </SessionContext.Provider>
  );
};