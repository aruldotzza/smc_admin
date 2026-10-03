"use client";

import React, { useState } from "react";
import { useBookings } from "@/context/BookingContext";
import { BookingChannel, VehicleCategory, BookingStatus } from "@/types/booking";

export default function NewBookingModal() {
  const { isNewBookingModalOpen, closeNewBookingModal, addBooking } = useBookings();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<BookingChannel>("website");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("SMC-001");
  const [pickupDate, setPickupDate] = useState("2026-10-05");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [pickupLocation, setPickupLocation] = useState("Singapore Changi Airport T3");
  const [dropoffLocation, setDropoffLocation] = useState("Marina Bay Sands");
  const [passengers, setPassengers] = useState("4");
  const [luggageBags, setLuggageBags] = useState("3");
  const [meetAndGreet, setMeetAndGreet] = useState(true);
  const [specialRequest, setSpecialRequest] = useState("");

  if (!isNewBookingModalOpen) return null;

  const vehicleOptions = [
    {
      id: "SMC-001",
      code: "SMC-001",
      name: "6 Seater Maxi Cab",
      desc: "Toyota Vellfire / Alphard · 6 pax · 5 bags",
      driver: "Ahmad Rizal",
      fare: 65,
      category: "6_seater" as VehicleCategory,
    },
    {
      id: "SMC-002",
      code: "SMC-002",
      name: "7 Seater Maxi Cab",
      desc: "Mercedes V-Class · 7 pax · 7 bags",
      driver: "Tan Wei Ming",
      fare: 75,
      category: "7_seater" as VehicleCategory,
    },
    {
      id: "SMC-003",
      code: "SMC-003",
      name: "9 Seater Maxi Cab",
      desc: "Toyota Hiace Luxury · 9 pax · 8 bags",
      driver: "Mohd Rashid",
      fare: 75,
      category: "9_seater" as VehicleCategory,
    },
    {
      id: "SMC-004",
      code: "SMC-004",
      name: "13 Seater Minibus",
      desc: "Toyota Hiace Super Long · 13 pax · 10 bags",
      driver: "Kelvin Lee",
      fare: 80,
      category: "13_seater" as VehicleCategory,
    },
    {
      id: "SMC-005",
      code: "SMC-005",
      name: "VIP Lounge 7-Seater",
      desc: "Toyota Alphard Executive · 7 pax · 4 bags",
      driver: "James Loh",
      fare: 90,
      category: "luxury_sedan" as VehicleCategory,
    },
    {
      id: "SMC-006",
      code: "SMC-006",
      name: "Wheelchair Maxi Cab",
      desc: "Modified Toyota Hiace · 5 pax · 4 bags",
      driver: "Suresh Nair",
      fare: 75,
      category: "wheelchair" as VehicleCategory,
    },
  ];

  const currentVehicle =
    vehicleOptions.find((v) => v.id === selectedVehicle) || vehicleOptions[0];

  const totalFare = currentVehicle.fare + (meetAndGreet ? 10 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Please provide Customer Name and Phone.");
      return;
    }

    addBooking({
      customerName,
      phone,
      email: email || "customer@email.com",
      channel,
      serviceType: "airport_transfer",
      vehicleType: currentVehicle.category,
      vehicleName: currentVehicle.name,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      passengers: Number(passengers),
      luggageBags: Number(luggageBags),
      meetAndGreet,
      specialRequest: specialRequest || undefined,
      status: "pending" as BookingStatus,
      fare: totalFare,
    });

    closeNewBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div
        className="w-[580px] max-w-[580px] max-h-[90vh] bg-color-background-white rounded-2xl shadow-2xl flex flex-col justify-start items-start overflow-hidden font-['Manrope']"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="self-stretch px-6 py-4 bg-color-background-brand border-b border-color-border-subtle inline-flex justify-between items-center flex-shrink-0">
          <div className="inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-orange-400 text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-widest">
                Manual Entry
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-inverse text-base font-bold font-['Manrope'] leading-6">
                New Booking
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeNewBookingModal}
            className="size-8 flex justify-center items-center text-white/60 hover:text-white cursor-pointer"
          >
            <div className="size-4 relative overflow-hidden">
              <div className="size-2 left-[4px] top-[4px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-white/60" />
            </div>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex-1 px-6 py-5 flex flex-col justify-start items-start gap-5 overflow-y-auto"
        >
          {/* Customer Information */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Customer Information
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-3">
              {/* Full Name */}
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                    Full Name *
                  </div>
                </div>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Tan"
                  className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Phone & Email (2-col) */}
              <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                      Phone Number *
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+65 9XXX XXXX"
                    className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                      Email (optional)
                    </div>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@email.com"
                    className="self-stretch h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Booked Via */}
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                    Booked Via
                  </div>
                </div>
                <div className="self-stretch grid grid-cols-4 gap-2">
                  {(
                    [
                      { id: "website", label: "Website" },
                      { id: "whatsapp", label: "WhatsApp" },
                      { id: "phone", label: "Phone Call" },
                      { id: "email", label: "Email" },
                    ] as const
                  ).map((ch) => {
                    const isSelected = channel === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setChannel(ch.id)}
                        className={`py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-color-background-brand outline-slate-900 text-color-text-inverse"
                            : "bg-stone-100 outline-color-border-subtle text-color-input-placeholder hover:bg-stone-200/50"
                        }`}
                      >
                        <span className="text-[10px] font-semibold font-['Manrope'] leading-4">
                          {ch.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Vehicle Selection
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-2">
              {vehicleOptions.map((v) => {
                const isSelected = selectedVehicle === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v.id)}
                    className={`self-stretch px-4 py-3 rounded-xl outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center cursor-pointer transition-all ${
                      isSelected
                        ? "bg-orange-400/5 outline-color-selection-recommended-border"
                        : "bg-color-background-white outline-color-border-subtle hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                      <div className="self-stretch inline-flex justify-start items-center gap-2">
                        <div className="px-1.5 py-0.5 bg-orange-400/10 rounded-sm inline-flex flex-col justify-start items-start">
                          <div className="justify-start text-orange-400 text-[10px] font-bold font-['Manrope'] leading-4 tracking-wide">
                            {v.code}
                          </div>
                        </div>
                        <div className="text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                          {v.name}
                        </div>
                      </div>
                      <div className="pt-0.5 text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                        {v.desc}
                      </div>
                      <div className="pt-0.5 text-xs font-normal font-['Manrope'] leading-4">
                        <span className="text-color-input-placeholder">Driver: </span>
                        <span className="text-color-text-primary font-medium">
                          {v.driver}
                        </span>
                      </div>
                    </div>
                    <div className="pl-3 flex flex-col justify-start items-end">
                      <div className="text-right text-orange-400 text-base font-bold font-['Manrope'] leading-6">
                        ${v.fare}
                      </div>
                      <div className="text-right text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                        base fare
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Route & Schedule */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Route & Schedule
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-3">
              <div className="self-stretch grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-color-input-placeholder uppercase mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-stone-100 rounded-lg outline outline-1 outline-color-border-subtle text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-color-input-placeholder uppercase mb-1">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-stone-100 rounded-lg outline outline-1 outline-color-border-subtle text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-color-input-placeholder uppercase mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-stone-100 rounded-lg outline outline-1 outline-color-border-subtle text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-color-input-placeholder uppercase mb-1">
                  Dropoff Location
                </label>
                <input
                  type="text"
                  required
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-stone-100 rounded-lg outline outline-1 outline-color-border-subtle text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="self-stretch flex items-center justify-between p-3 bg-stone-100 rounded-lg">
                <div className="text-xs text-color-text-primary font-medium">
                  Airport Meet & Greet (+ $10 SGD)
                </div>
                <input
                  type="checkbox"
                  checked={meetAndGreet}
                  onChange={(e) => setMeetAndGreet(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-color-input-placeholder uppercase mb-1">
                  Special Request (optional)
                </label>
                <input
                  type="text"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="e.g. Please have bottled water"
                  className="w-full h-10 px-3 py-2 bg-stone-100 rounded-lg outline outline-1 outline-color-border-subtle text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="self-stretch pt-2 border-t border-color-border-subtle inline-flex justify-start items-start gap-3">
            <button
              type="button"
              onClick={closeNewBookingModal}
              className="flex-1 h-11 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex justify-center items-center text-color-input-placeholder text-sm font-semibold font-['Manrope'] hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 py-2.5 bg-color-background-accent rounded-lg flex justify-center items-center text-color-text-primary text-sm font-semibold font-['Manrope'] hover:brightness-105 cursor-pointer"
            >
              Create Booking (${totalFare} SGD)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
