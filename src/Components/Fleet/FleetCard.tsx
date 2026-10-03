"use client";

import React from "react";
import { Vehicle } from "@/types/fleet";
import { useFleet } from "@/context/FleetContext";

interface FleetCardProps {
  vehicle: Vehicle;
}

export default function FleetCard({ vehicle }: FleetCardProps) {
  const { openEditVehicleModal, toggleVehicleStatus } = useFleet();

  const driverInitials = vehicle.driverName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const openWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://wa.me/${vehicle.driverPhone.replace(/[^0-9]/g, "")}`,
      "_blank"
    );
  };

  const charter3h = vehicle.baseRate * 3 - 15;
  const charter8h = vehicle.hourlyRate * 8;

  return (
    <div className="bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start overflow-hidden font-['Manrope']">
      {/* Top Banner Image */}
      <div className="self-stretch h-36 relative bg-color-background-brand overflow-hidden">
        <div className="w-full h-36 left-0 top-0 absolute bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90" />
        <div className="w-full px-3 py-2.5 left-0 top-0 absolute inline-flex justify-between items-start">
          <div className="px-2 py-0.5 bg-slate-900/70 rounded-md inline-flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-inverse text-xs font-bold font-['Manrope'] leading-4 tracking-wide">
              {vehicle.fleetNumber || "SMC-001"}
            </div>
          </div>
          <div
            className={`px-2 py-0.5 rounded-full outline outline-1 outline-offset-[-1px] inline-flex flex-col justify-start items-start ${
              vehicle.status === "active"
                ? "bg-green-100 outline-green-200 text-green-700"
                : "bg-stone-100 outline-color-border-subtle text-color-input-placeholder"
            }`}
          >
            <div className="justify-start text-[10px] font-semibold font-['Manrope'] leading-4">
              {vehicle.status === "active" ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="self-stretch flex-1 p-4 flex flex-col justify-start items-start gap-3">
        {/* Title & Model */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-base font-bold font-['Manrope'] leading-6 truncate">
              {vehicle.name}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4 truncate">
              {vehicle.model}
            </div>
          </div>
        </div>

        {/* Assigned Driver Row */}
        <div className="self-stretch px-3 py-2 bg-color-background-selected rounded-lg inline-flex justify-between items-center gap-2">
          <div className="size-7 bg-color-background-brand rounded-full flex justify-center items-center flex-shrink-0">
            <div className="justify-start text-color-text-inverse text-[9px] font-bold font-['Manrope'] leading-3">
              {driverInitials}
            </div>
          </div>
          <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
            <div className="self-stretch h-4 flex flex-col justify-start items-start overflow-hidden">
              <div className="justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-4 truncate">
                {vehicle.driverName}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4 truncate">
                {vehicle.driverPhone}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={openWhatsApp}
            className="size-7 bg-color-status-success rounded-md flex justify-center items-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            title="Chat on WhatsApp"
          >
            <div className="size-3.5 relative overflow-hidden flex items-center justify-center">
              <div className="size-3 bg-color-input-background rounded-full" />
            </div>
          </button>
        </div>

        {/* 6 Specs Rows */}
        <div className="self-stretch grid grid-cols-2 gap-1.5">
          <div className="px-2.5 py-1.5 bg-stone-100 rounded-lg inline-flex justify-between items-center">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              Capacity
            </div>
            <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
              {vehicle.paxCapacity} pax
            </div>
          </div>

          <div className="px-2.5 py-1.5 bg-stone-100 rounded-lg inline-flex justify-between items-center">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              Luggage
            </div>
            <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
              {vehicle.luggageCapacity} bags
            </div>
          </div>

          <div className="px-2.5 py-1.5 bg-stone-100 rounded-lg inline-flex justify-between items-center">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              Base Fare
            </div>
            <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
              ${vehicle.baseRate}
            </div>
          </div>

          <div className="px-2.5 py-1.5 bg-stone-100 rounded-lg inline-flex justify-between items-center">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              Meet & Greet
            </div>
            <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
              ${vehicle.baseRate + 10}
            </div>
          </div>

          <div className="px-2.5 py-1.5 bg-stone-100 rounded-lg inline-flex justify-between items-center">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              3h Charter
            </div>
            <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
              ${charter3h}
            </div>
          </div>

          <div className="px-2.5 py-1.5 bg-stone-100 rounded-lg inline-flex justify-between items-center">
            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              8h Charter
            </div>
            <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
              ${charter8h}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="self-stretch pt-1 inline-flex justify-start items-center gap-2">
          <button
            type="button"
            onClick={() => openEditVehicleModal(vehicle)}
            className="flex-1 py-2 bg-color-background-brand rounded-lg flex justify-center items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="size-3.5 relative overflow-hidden flex items-center justify-center">
              <div className="size-2.5 outline outline-[1.40px] outline-offset-[-0.70px] outline-color-border-focus" />
            </div>
            <div className="text-center justify-start text-color-text-inverse text-xs font-semibold font-['Manrope'] leading-4">
              Edit
            </div>
          </button>

          <button
            type="button"
            onClick={() => toggleVehicleStatus(vehicle.id)}
            className="px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-red-200 flex justify-center items-center gap-1.5 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <div className="text-center justify-start text-red-600 text-xs font-semibold font-['Manrope'] leading-4">
              {vehicle.status === "active" ? "Deactivate" : "Activate"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
