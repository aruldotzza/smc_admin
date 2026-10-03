"use client";

import React, { useState } from "react";
import { useFleet } from "@/context/FleetContext";
import { VehicleStatus } from "@/types/fleet";

export default function AddVehicleModal() {
  const { isAddVehicleModalOpen, closeAddVehicleModal, addVehicle, totalVehiclesCount } =
    useFleet();

  const [fleetNumber, setFleetNumber] = useState(`SMC-00${totalVehiclesCount + 1}`);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [imagePath, setImagePath] = useState("/assets/2edae.png");
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("+65 ");
  const [paxCapacity, setPaxCapacity] = useState(6);
  const [luggageCapacity, setLuggageCapacity] = useState(4);
  const [baseFare, setBaseFare] = useState(65);
  const [meetAndGreet, setMeetAndGreet] = useState(75);
  const [charter3h, setCharter3h] = useState(180);
  const [charter8h, setCharter8h] = useState(480);
  const [isActive, setIsActive] = useState(true);

  if (!isAddVehicleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter Vehicle Name.");
      return;
    }

    addVehicle({
      fleetNumber: fleetNumber || `SMC-00${totalVehiclesCount + 1}`,
      name,
      model: model || "Toyota Vellfire / Alphard",
      category: "6_seater",
      plateNumber: "SHA 1234 X",
      paxCapacity: Number(paxCapacity),
      luggageCapacity: Number(luggageCapacity),
      baseRate: Number(baseFare),
      hourlyRate: Math.round(Number(charter8h) / 8),
      driverName: driverName || "Unassigned",
      driverPhone: driverPhone || "+65 9000 0000",
      status: (isActive ? "active" : "inactive") as VehicleStatus,
      features: ["Luggage Space", "Air Conditioning", "Executive Seating"],
    });

    closeAddVehicleModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-color-overlay-hero flex justify-center items-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-[520px] max-h-[90vh] bg-color-background-white rounded-2xl shadow-2xl flex flex-col justify-start items-start overflow-hidden font-['Manrope']"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="self-stretch px-6 py-4 border-b border-color-border-subtle inline-flex justify-between items-center flex-shrink-0">
          <div className="inline-flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-base font-bold font-['Manrope'] leading-6">
              Add New Vehicle
            </div>
          </div>
          <button
            type="button"
            onClick={closeAddVehicleModal}
            className="size-8 flex justify-center items-center text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <div className="size-4 relative overflow-hidden">
              <div className="size-2 left-[4px] top-[4px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-gray-500" />
            </div>
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex-1 px-6 py-5 flex flex-col justify-start items-start gap-5 overflow-y-auto"
        >
          {/* Vehicle Identity */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Vehicle Identity
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Fleet Number
                </div>
                <input
                  type="text"
                  required
                  value={fleetNumber}
                  onChange={(e) => setFleetNumber(e.target.value)}
                  placeholder="e.g. SMC-007"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Vehicle Name *
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 6 Seater Maxi Cab"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Subtitle / Model
                </div>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Toyota Vellfire / Alphard"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Image Path
                </div>
                <input
                  type="text"
                  value={imagePath}
                  onChange={(e) => setImagePath(e.target.value)}
                  placeholder="/assets/2edae.png"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Assigned Driver */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Assigned Driver
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Driver Full Name
                </div>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Ahmad Rizal"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Driver Phone
                </div>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="+65 9101 1234"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Capacity
              </div>
            </div>
            <div className="self-stretch pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Max Passengers
                </div>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={paxCapacity}
                  onChange={(e) => setPaxCapacity(Number(e.target.value))}
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Max Luggage
                </div>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={luggageCapacity}
                  onChange={(e) => setLuggageCapacity(Number(e.target.value))}
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing (SGD) */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Pricing (SGD)
              </div>
            </div>
            <div className="self-stretch pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Base Fare ($)
                </div>
                <input
                  type="number"
                  value={baseFare}
                  onChange={(e) => setBaseFare(Number(e.target.value))}
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Meet & Greet ($)
                </div>
                <input
                  type="number"
                  value={meetAndGreet}
                  onChange={(e) => setMeetAndGreet(Number(e.target.value))}
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  3-Hour Charter ($)
                </div>
                <input
                  type="number"
                  value={charter3h}
                  onChange={(e) => setCharter3h(Number(e.target.value))}
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  8-Hour Charter ($)
                </div>
                <input
                  type="number"
                  value={charter8h}
                  onChange={(e) => setCharter8h(Number(e.target.value))}
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-color-text-primary font-normal font-['Manrope'] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Active Switch Toggle */}
          <div
            onClick={() => setIsActive(!isActive)}
            className="self-stretch inline-flex justify-start items-center gap-3 cursor-pointer select-none"
          >
            <div
              className={`w-10 h-6 rounded-full inline-flex flex-col justify-center items-start transition-colors ${
                isActive ? "bg-color-background-accent" : "bg-stone-300"
              }`}
            >
              <div
                className={`size-4 bg-color-background-white rounded-full shadow transition-transform ${
                  isActive ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>
            <div className="justify-start text-color-text-primary text-xs font-normal font-['Manrope'] leading-5">
              Vehicle is active
            </div>
          </div>

          {/* Footer */}
          <div className="self-stretch pt-2 border-t border-color-border-subtle inline-flex justify-start items-start gap-3">
            <button
              type="button"
              onClick={closeAddVehicleModal}
              className="flex-1 h-11 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex justify-center items-center text-color-input-placeholder text-sm font-semibold font-['Manrope'] hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 py-2.5 bg-color-background-accent rounded-lg flex justify-center items-center text-color-text-primary text-sm font-semibold font-['Manrope'] hover:brightness-105 cursor-pointer"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
