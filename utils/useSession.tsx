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
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  refreshSession: async () => {},
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const refreshSession = async () => {
    setLoading(true);
    await fetchSession();
  };

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
};