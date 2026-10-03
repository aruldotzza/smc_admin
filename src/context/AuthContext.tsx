"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  name: string;
  email: string;
  role: "owner" | "dispatcher" | "admin";
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const defaultUser: User = {
  name: "Owner",
  email: "owner@singaporemaxicabs.com.sg",
  role: "owner",
  initials: "OW",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);
  const router = useRouter();
  const pathname = usePathname();

  const login = (email: string, pass: string): boolean => {
    if (email && pass) {
      const loggedUser: User = {
        name: email.includes("owner") ? "Owner" : "Admin Staff",
        email: email,
        role: "owner",
        initials: email.includes("owner") ? "OW" : "AD",
      };
      setUser(loggedUser);
      router.push("/");
      return true;
    }
    return false;
  };

  const logout = () => {
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
