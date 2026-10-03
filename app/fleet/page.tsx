"use client";

import React from "react";
import AdminLayout from "@/Components/Layout/AdminLayout";
import FleetCard from "@/Components/Fleet/FleetCard";
import AddVehicleModal from "@/Components/Fleet/AddVehicleModal";
import EditVehicleModal from "@/Components/Fleet/EditVehicleModal";
import { useFleet } from "@/context/FleetContext";

export default function FleetPage() {
  const { vehicles, activeVehiclesCount, totalVehiclesCount, openAddVehicleModal } =
    useFleet();

  return (
    <AdminLayout>
      <div className="w-full max-w-[1200px] flex flex-col justify-start items-start gap-5 font-['Manrope']">
        {/* Page Header matching FlletPage.html */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xl font-bold font-['Manrope'] leading-8">
                Fleet Management
              </div>
            </div>
            <div className="pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                {activeVehiclesCount} active of {totalVehiclesCount} total vehicles
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddVehicleModal}
            className="px-4 py-2.5 bg-color-background-accent rounded-lg flex justify-start items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <div className="size-2.5 outline outline-[1.60px] outline-offset-[-0.80px] outline-slate-900" />
            </div>
            <div className="text-center justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
              Add Vehicle
            </div>
          </button>
        </div>

        {/* Fleet Grid (6 vehicles) */}
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Modals */}
        <AddVehicleModal />
        <EditVehicleModal />
      </div>
    </AdminLayout>
  );
}
