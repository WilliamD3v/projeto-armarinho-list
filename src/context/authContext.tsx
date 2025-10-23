"use client";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface SignInData {
  email?: string;
  password?: string;
}

interface AlertType {
  type: "success" | "error" | null;
  message: string;
}

interface AuthContextType {
  user: User | null;
  alert: AlertType | null;
  signIn: (data: SignInData) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [alert, setAlert] = useState<AlertType>({ type: null, message: "" });
  const router = useRouter();

  const getAdminProfile = async () => {
    const { "nextauth.token": tokenParse } = parseCookies();
    if (!tokenParse) return null;

    try {
      const { data } = await axios.get("/auth/users", {
        headers: { Authorization: `Bearer ${tokenParse}` },
      });
      return data;
    } catch (error) {
      console.error("Erro ao obter dados do admin:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const admin = await getAdminProfile();

      if (admin) {
        setUserData(admin.data);
      }
    };

    fetchData();
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      console.log("");
      const response = await axios.post("/auth/login", { email, password });
      console.log(response);
      const { token } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60,
        path: "/",
      });

      const profileData = await getAdminProfile();
      if (!profileData) throw new Error("Falha ao obter dados do admin");

      const userId = profileData.data._id;

      setCookie(undefined, "nextauth.userId", userId, {
        maxAge: 60 * 60,
        path: "/",
      });

      setUserData(profileData.data);
      setAlert({ type: "success", message: "Login de admin bem-sucedido!" });

      router.push(`/dashboard/admin/${userId}`);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Erro ao fazer login de admin",
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user: userData, signIn, alert }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
