interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (emailAddress: string, passWord: string) => Promise<void>;
    register: (emailAddress: string, passWord: string,fullName:string) => Promise<void>;
    logout: () => void;
  }
interface User{
    emailAddress: string,
    passWord: string
}
