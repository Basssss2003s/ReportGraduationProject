"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
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
  const [sessionTimestamp, setSessionTimestamp] = useState<number | null>(null);
  const router = useRouter();

  const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 นาที (900,000 มิลลิวินาที)

  const getSession = async () => {
    try {
      const response = await axiosApi<SessionData>('get', '/auth/profileAdmin');
      setSession(response);
      setSessionTimestamp(Date.now());
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
      setSessionTimestamp(Date.now());
    } catch (error) {
      console.error('ดึงข้อมูล session ไม่สำเร็จ:', error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const redirectToLogin = () => {
    if (session?.emailAddress?.includes('@mail.rmutt.ac.th')) {
      router.push('/adminlogin'); // ถ้าเป็น admin → ไปที่ /loginadmin
    } else {
      router.push('/login'); // ถ้าเป็น user ธรรมดา → ไปที่ /login
    }
  };

  useEffect(() => {
    fetchSession();
    getSession();

    // ตั้ง timeout 15 นาที
    const timeout = setTimeout(() => {
      setSession(null);
      setSessionTimestamp(null);
      redirectToLogin();
    }, SESSION_TIMEOUT);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionTimestamp && Date.now() - sessionTimestamp >= SESSION_TIMEOUT) {
        setSession(null);
        setSessionTimestamp(null);
        redirectToLogin();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionTimestamp]);

  const refreshSession = async () => {
    setLoading(true);
    await fetchSession();
  };

  const refreshSession2 = async () => {
    setLoading(true);
    await getSession();
  };

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession, refreshSession2 }}>
      {children}
    </SessionContext.Provider>
  );
};
