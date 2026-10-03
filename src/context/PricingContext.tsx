"use client";

import React, { createContext, useContext, useState } from "react";
import { VehiclePricingRate } from "@/types/pricing";
import { initialPricingRates } from "@/data/initialPricing";

interface PricingContextType {
  rates: VehiclePricingRate[];
  updateRate: (
    id: string,
    field: keyof VehiclePricingRate,
    value: number
  ) => void;
  saveStatus: "idle" | "saving" | "saved";
  saveAllChanges: () => void;
  resetToDefaults: () => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<VehiclePricingRate[]>(initialPricingRates);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const updateRate = (
    id: string,
    field: keyof VehiclePricingRate,
    value: number
  ) => {
    setRates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const saveAllChanges = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 500);
  };

  const resetToDefaults = () => {
    setRates(initialPricingRates);
  };

  return (
    <PricingContext.Provider
      value={{
        rates,
        updateRate,
        saveStatus,
        saveAllChanges,
        resetToDefaults,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
}
