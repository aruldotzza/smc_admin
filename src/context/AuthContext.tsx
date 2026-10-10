"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { API_CONFIG } from "@/config/api";

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

  const login = async (username: string, pass: string): Promise<boolean> => {
    if (username && pass) {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: pass,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming successful login for now. 
          // You may want to parse token and user details from `data` in the future.
          const loggedUser: User = {
            name: username,
            email: `${username}@singaporemaxicabs.com.sg`,
            role: "admin",
            initials: username.substring(0, 2).toUpperCase(),
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
