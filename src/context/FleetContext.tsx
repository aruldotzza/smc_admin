"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Vehicle, VehicleStatus } from "@/types/fleet";
import { initialFleet } from "@/data/initialFleet";
import { getVehicles, createVehicle as apiCreateVehicle, updateVehicle as apiUpdateVehicle, setVehicleServiceRate } from "@/lib/api/services";
import { ApiVehicle } from "@/types/api";

interface FleetContextType {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  refreshVehicles: () => Promise<void>;
  isAddVehicleModalOpen: boolean;
  openAddVehicleModal: () => void;
  closeAddVehicleModal: () => void;
  isEditVehicleModalOpen: boolean;
  editingVehicle: Vehicle | null;
  openEditVehicleModal: (vehicle: Vehicle) => void;
  closeEditVehicleModal: () => void;
  addVehicle: (data: Partial<Vehicle>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  toggleVehicleStatus: (id: string) => Promise<void>;
  deleteVehicle: (id: string) => void;
  activeVehiclesCount: number;
  totalVehiclesCount: number;
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

// Helper to categorize API vehicles
function inferCategory(name: string, pax: number | null): Vehicle["category"] {
  const lower = name.toLowerCase();
  if (lower.includes("wheelchair")) return "wheelchair";
  if (lower.includes("vip") || lower.includes("executive")) return "luxury_sedan";
  if (lower.includes("13") || lower.includes("minibus") || (pax && pax >= 13)) return "13_seater";
  if (lower.includes("9") || (pax && pax >= 9)) return "9_seater";
  if (lower.includes("7") || (pax && pax >= 7)) return "7_seater";
  return "6_seater";
}

// Map mock driver details for display
const driverProfiles: Record<number, { name: string; phone: string; plate: string }> = {
  3: { name: "Ahmad Rizal", phone: "+65 9101 1234", plate: "SMC 1101 A" },
  4: { name: "Tan Wei Ming", phone: "+65 9202 2345", plate: "SMC 1202 B" },
  5: { name: "Mohd Rashid", phone: "+65 9303 3456", plate: "SMC 1303 C" },
  6: { name: "Kelvin Lee", phone: "+65 9404 4567", plate: "SMC 1404 D" },
  7: { name: "James Loh", phone: "+65 9505 5678", plate: "SMC 1505 E" },
  8: { name: "Suresh Nair", phone: "+65 9606 6789", plate: "SMC 1606 F" },
  9: { name: "David Lim", phone: "+65 9707 7890", plate: "SMC 1707 G" },
  10: { name: "Raymond Chen", phone: "+65 9808 8901", plate: "SMC 1808 H" },
};

function mapApiToVehicle(v: ApiVehicle, index: number): Vehicle {
  const driver = driverProfiles[v.id] || {
    name: `Driver ${index + 1}`,
    phone: `+65 9${String(100 + index).padStart(3, "0")} ${String(1000 + index).slice(0, 4)}`,
    plate: `SGA ${1000 + index} A`,
  };

  const baseRate =
    v.prices?.departure_transfer?.amount ??
    v.prices?.arrival?.amount ??
    65;

  const hourlyRate =
    v.prices?.hourly?.amount ??
    60;

  return {
    id: String(v.id),
    apiId: v.id,
    fleetNumber: `SMC-${String(index + 1).padStart(3, "0")}`,
    name: v.name,
    model: v.description || v.vehicleType || "Maxi Cab",
    category: inferCategory(v.name, v.passengerCapacity),
    plateNumber: driver.plate,
    paxCapacity: v.passengerCapacity || 6,
    luggageCapacity: v.luggageCapacity || 4,
    baseRate,
    hourlyRate,
    status: v.status === "active" || v.isActive !== false ? "active" : "inactive",
    driverName: driver.name,
    driverPhone: driver.phone,
    features: ["Air Conditioning", "Executive Seating", "Luggage Space"],
    imageUrl: v.imageUrl || undefined,
    imagePath: "/assets/2edae.png",
    lastServiceDate: "2026-10-01",
    prices: v.prices,
  };
}

export function FleetProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialFleet);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const hasFetchedRef = useRef(false);

  const refreshVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getVehicles();
      if (res && res.data && res.data.length > 0) {
        const mapped = res.data.map((item, idx) => mapApiToVehicle(item, idx));
        setVehicles(mapped);
      }
    } catch (err: any) {
      console.warn("Could not fetch vehicles from live API, using local fleet state:", err?.message);
      setError(err?.message || "Failed to load live vehicles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      refreshVehicles();
    }
  }, [refreshVehicles]);

  const openAddVehicleModal = () => setIsAddVehicleModalOpen(true);
  const closeAddVehicleModal = () => setIsAddVehicleModalOpen(false);

  const openEditVehicleModal = (vehicle: Vehicle) => setEditingVehicle(vehicle);
  const closeEditVehicleModal = () => setEditingVehicle(null);

  const addVehicle = async (data: Partial<Vehicle>) => {
    try {
      const baseFare = data.baseRate || 65;
      const hourly = data.hourlyRate || 60;
      const meetGreet = baseFare + 10;

      // Try creating via API
      try {
        const created = await apiCreateVehicle({
          name: data.name || "New Vehicle",
          description: data.model || "Executive MPV",
          passengerCapacity: data.paxCapacity || 6,
          luggageCapacity: data.luggageCapacity || 4,
          currency: "SGD",
          vehicleTypeId: null,
          imageUrl: data.imageUrl || null,
          status: data.status === "active" ? "active" : "inactive",
          prices: {
            arrival: { amount: meetGreet },
            departure_transfer: { amount: baseFare },
            hourly: { amount: hourly, minimumHours: 3 },
          },
        });

        if (created?.vehicle) {
          await refreshVehicles();
          closeAddVehicleModal();
          return;
        }
      } catch (apiErr) {
        console.warn("API create vehicle failed, adding to local state:", apiErr);
      }

      // Fallback local addition
      const newVehicle: Vehicle = {
        id: `v-${Date.now()}`,
        fleetNumber: data.fleetNumber || `SMC-00${vehicles.length + 1}`,
        name: data.name || "New Vehicle",
        model: data.model || "Toyota Alphard",
        category: data.category || "6_seater",
        plateNumber: data.plateNumber || "SGA 1111 A",
        paxCapacity: data.paxCapacity || 6,
        luggageCapacity: data.luggageCapacity || 4,
        baseRate: baseFare,
        hourlyRate: hourly,
        status: data.status || "active",
        driverName: data.driverName || "Assigned Driver",
        driverPhone: data.driverPhone || "+65 9111 2222",
        features: data.features || ["Air Conditioning", "Leather Seats"],
        lastServiceDate: new Date().toISOString().split("T")[0],
      };
      setVehicles((prev) => [...prev, newVehicle]);
    } finally {
      closeAddVehicleModal();
    }
  };

  const updateVehicle = async (id: string, updates: Partial<Vehicle>) => {
    const target = vehicles.find((v) => v.id === id);
    const numId = target?.apiId || (!isNaN(Number(id)) ? Number(id) : null);

    if (numId) {
      try {
        // 1. Update vehicle metadata
        await apiUpdateVehicle(numId, {
          name: updates.name,
          description: updates.model,
          passengerCapacity: updates.paxCapacity,
          luggageCapacity: updates.luggageCapacity,
          status: updates.status ? (updates.status === "active" ? "active" : "inactive") : undefined,
        });

        // 2. If rate changed, update service rates
        if (updates.baseRate !== undefined) {
          await setVehicleServiceRate(numId, "departure_transfer", {
            amount: updates.baseRate,
            currency: "SGD",
          });
          await setVehicleServiceRate(numId, "arrival", {
            amount: updates.baseRate + 10,
            currency: "SGD",
          });
        }
        if (updates.hourlyRate !== undefined) {
          await setVehicleServiceRate(numId, "hourly", {
            amount: updates.hourlyRate,
            currency: "SGD",
            minimumHours: 3,
          });
        }

        await refreshVehicles();
        closeEditVehicleModal();
        return;
      } catch (err) {
        console.warn("API update vehicle failed, updating local state:", err);
      }
    }

    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    closeEditVehicleModal();
  };

  const toggleVehicleStatus = async (id: string) => {
    const target = vehicles.find((v) => v.id === id);
    if (!target) return;

    const nextStatus: VehicleStatus =
      target.status === "active" ? "inactive" : "active";

    const numId = target.apiId || (!isNaN(Number(id)) ? Number(id) : null);
    if (numId) {
      try {
        await apiUpdateVehicle(numId, {
          status: nextStatus === "active" ? "active" : "inactive",
        });
        await refreshVehicles();
        return;
      } catch (err) {
        console.warn("API toggle vehicle status failed, toggling locally:", err);
      }
    }

    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: nextStatus } : v))
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const activeVehiclesCount = useMemo(() => {
    return vehicles.filter((v) => v.status === "active").length;
  }, [vehicles]);

  return (
    <FleetContext.Provider
      value={{
        vehicles,
        isLoading,
        error,
        refreshVehicles,
        isAddVehicleModalOpen,
        openAddVehicleModal,
        closeAddVehicleModal,
        isEditVehicleModalOpen: Boolean(editingVehicle),
        editingVehicle,
        openEditVehicleModal,
        closeEditVehicleModal,
        addVehicle,
        updateVehicle,
        toggleVehicleStatus,
        deleteVehicle,
        activeVehiclesCount,
        totalVehiclesCount: vehicles.length,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
}

export function useFleet() {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error("useFleet must be used within a FleetProvider");
  }
  return context;
}
