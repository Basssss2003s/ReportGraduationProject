"use client";
import { useState, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import { axiosApi } from './axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = async (email: string, password: string) => {
    try {
      const response: User | null = await axiosApi('post','/auth/login',
        {
          emailAddress: email,
          passWord: password
        },
        { 
          withCredentials: true // เพิ่มการส่ง cookies
        }
      );
  
      setUser(response); // ตั้งค่าผู้ใช้หลังจาก login สำเร็จ
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  


  const register = async (email: string, password: string,fullName:string): Promise<any> => {
    try {
      const response = await axiosApi('post','/auth/register', {
        emailAddress: email,
        passWord: password,
        fullName:fullName
      });
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

 const logout = async () => {
    try {
      await axiosApi('post','/auth/logout', {}, 
        { 
          withCredentials: true 
        }
      );
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
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