"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Cookies from "js-cookie";
import { adminLogin } from "@/lib/api/services";

export interface User {
  name: string;
  email: string;
  role: "owner" | "dispatcher" | "admin";
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Removed default user to ensure proper auth flow
// We will only have a user if they actually log in.

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we have a token but no user object, we can construct a placeholder user
    // or fetch the user from a /me endpoint. For now, we'll restore a placeholder.
    const token = Cookies.get("accessToken");
    if (token && !user) {
      setUser({
        name: "Admin",
        email: "admin@singaporemaxicabs.com.sg",
        role: "admin",
        initials: "AD",
      });
    }
  }, []);

  const login = async (username: string, pass: string): Promise<boolean> => {
    if (username && pass) {
      try {
        const data = await adminLogin({
          username: username,
          password: pass,
        });

        if (data && (data.token || data.accessToken || data.access_token)) {
          const tokenToStore = data.token || data.accessToken || data.access_token;
          
          if (tokenToStore) {
            Cookies.set("accessToken", tokenToStore, { expires: 1 });
          }

          const loggedUser: User = {
            name: data.user?.username || username,
            email: data.user?.email || `${username}@singaporemaxicabs.com.sg`,
            role: (data.user?.role as any) || "admin",
            initials: (data.user?.username || username).substring(0, 2).toUpperCase(),
          };
          setUser(loggedUser);
          router.push("/");
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Login API error:", error);
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
