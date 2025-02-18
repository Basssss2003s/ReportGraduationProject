interface AuthContextType {
    user: any;
    admin: any;
    isAuthenticated: boolean;
    login: (emailAddress: string, passWord: string) => Promise<void>;
    register: (emailAddress: string, passWord: string,fullName:string) => Promise<void>;
    logout: () => void;
    loginAdmin: (emailAddress: string, passWord: string) => Promise<void>;
  }
interface User{
    emailAddress: string,
    passWord: string
}
