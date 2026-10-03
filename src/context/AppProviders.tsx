"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";
import { BookingProvider } from "./BookingContext";
import { FleetProvider } from "./FleetContext";
import { PricingProvider } from "./PricingContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <BookingProvider>
        <FleetProvider>
          <PricingProvider>{children}</PricingProvider>
        </FleetProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
