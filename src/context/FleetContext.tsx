"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { Vehicle, VehicleStatus } from "@/types/fleet";
import { initialFleet } from "@/data/initialFleet";

interface FleetContextType {
  vehicles: Vehicle[];
  isAddVehicleModalOpen: boolean;
  openAddVehicleModal: () => void;
  closeAddVehicleModal: () => void;
  isEditVehicleModalOpen: boolean;
  editingVehicle: Vehicle | null;
  openEditVehicleModal: (vehicle: Vehicle) => void;
  closeEditVehicleModal: () => void;
  addVehicle: (data: Partial<Vehicle>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  toggleVehicleStatus: (id: string) => void;
  deleteVehicle: (id: string) => void;
  activeVehiclesCount: number;
  totalVehiclesCount: number;
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function FleetProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialFleet);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const openAddVehicleModal = () => setIsAddVehicleModalOpen(true);
  const closeAddVehicleModal = () => setIsAddVehicleModalOpen(false);

  const openEditVehicleModal = (vehicle: Vehicle) => setEditingVehicle(vehicle);
  const closeEditVehicleModal = () => setEditingVehicle(null);

  const addVehicle = (data: Partial<Vehicle>) => {
    const newVehicle: Vehicle = {
      id: `v-${Date.now()}`,
      fleetNumber: data.fleetNumber || `FL-0${vehicles.length + 1}01`,
      name: data.name || "New Vehicle",
      model: data.model || "Toyota Alphard",
      category: data.category || "6_seater",
      plateNumber: data.plateNumber || "SGA 1111 A",
      paxCapacity: data.paxCapacity || 6,
      luggageCapacity: data.luggageCapacity || 4,
      baseRate: data.baseRate || 65,
      hourlyRate: data.hourlyRate || 60,
      status: data.status || "active",
      driverName: data.driverName || "Assigned Driver",
      driverPhone: data.driverPhone || "+65 9111 2222",
      features: data.features || ["Air Conditioning", "Leather Seats"],
      lastServiceDate: new Date().toISOString().split("T")[0],
    };
    setVehicles((prev) => [...prev, newVehicle]);
    closeAddVehicleModal();
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    closeEditVehicleModal();
  };

  const toggleVehicleStatus = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextStatus: VehicleStatus =
            v.status === "active" ? "maintenance" : "active";
          return { ...v, status: nextStatus };
        }
        return v;
      })
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
