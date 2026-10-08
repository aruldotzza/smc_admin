"use client";

import React, { useState } from "react";
import { useBookings } from "@/context/BookingContext";
import { BookingChannel, VehicleCategory, BookingStatus } from "@/types/booking";
import { X, Globe, PhoneCall, Mail } from "lucide-react";
import PlacesAutocompleteInput from "@/Components/Common/PlacesAutocompleteInput";

export default function NewBookingModal() {
  const { isNewBookingModalOpen, closeNewBookingModal, addBooking } = useBookings();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<BookingChannel>("website");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("SMC-001");
  const [driverName, setDriverName] = useState("Ahmad Rizal");
  const [driverPhone, setDriverPhone] = useState("+65 9101 1234");
  const [pickupLocation, setPickupLocation] = useState("Changi Airport T3");
  const [dropoffLocation, setDropoffLocation] = useState("Marina Bay Sands");
  const [pickupDate, setPickupDate] = useState("2026-10-05");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [passengers, setPassengers] = useState("1");
  const [luggageBags, setLuggageBags] = useState("1");
  const [meetAndGreet, setMeetAndGreet] = useState(false);
  const [addons, setAddons] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [initialStatus, setInitialStatus] = useState<BookingStatus>("pending");

  if (!isNewBookingModalOpen) return null;

  const vehicleOptions = [
    {
      id: "SMC-001",
      code: "SMC-001",
      name: "6 Seater Maxi Cab",
      desc: "Toyota Vellfire / Alphard · 6 pax · 5 bags",
      driver: "Ahmad Rizal",
      driverPhone: "+65 9101 1234",
      fare: 65,
      category: "6_seater" as VehicleCategory,
    },
    {
      id: "SMC-002",
      code: "SMC-002",
      name: "7 Seater Maxi Cab",
      desc: "Toyota Vellfire · 7 pax · 5 bags",
      driver: "Tan Boon Seng",
      driverPhone: "+65 9234 5678",
      fare: 70,
      category: "7_seater" as VehicleCategory,
    },
    {
      id: "SMC-003",
      code: "SMC-003",
      name: "9 Seater Maxi Cab",
      desc: "Toyota Hiace · 9 pax · 7 bags",
      driver: "Ravi Kumar",
      driverPhone: "+65 9345 6789",
      fare: 75,
      category: "9_seater" as VehicleCategory,
    },
    {
      id: "SMC-004",
      code: "SMC-004",
      name: "13 Seater Minibus",
      desc: "Toyota Hiace Super Long · 13 pax · 10 bags",
      driver: "Muthu Selvam",
      driverPhone: "+65 9456 7890",
      fare: 80,
      category: "13_seater" as VehicleCategory,
    },
    {
      id: "SMC-005",
      code: "SMC-005",
      name: "VIP Lounge 7-Seater",
      desc: "Toyota Alphard Executive · 7 pax · 4 bags",
      driver: "James Loh",
      driverPhone: "+65 9567 8901",
      fare: 90,
      category: "luxury_sedan" as VehicleCategory,
    },
    {
      id: "SMC-006",
      code: "SMC-006",
      name: "Wheelchair Maxi Cab",
      desc: "Modified Toyota Hiace · 5 pax · 4 bags",
      driver: "Suresh Nair",
      driverPhone: "+65 9678 9012",
      fare: 75,
      category: "wheelchair" as VehicleCategory,
    },
  ];

  const currentVehicle =
    vehicleOptions.find((v) => v.id === selectedVehicle) || vehicleOptions[0];

  const totalFare = currentVehicle.fare + (meetAndGreet ? 10 : 0);

  const handleSelectVehicle = (v: (typeof vehicleOptions)[0]) => {
    setSelectedVehicle(v.id);
    setDriverName(v.driver);
    setDriverPhone(v.driverPhone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) {
      alert("Please provide Customer Name.");
      return;
    }

    addBooking({
      customerName,
      phone: phone || "+65 9123 4567",
      email: email || "customer@email.com",
      channel,
      serviceType: "airport_transfer",
      vehicleType: currentVehicle.category,
      vehicleName: currentVehicle.name,
      pickupLocation: pickupLocation || "Changi Airport T3",
      dropoffLocation: dropoffLocation || "Marina Bay Sands",
      pickupDate: pickupDate || "2026-10-05",
      pickupTime: pickupTime || "09:00",
      passengers: Number(passengers) || 1,
      luggageBags: Number(luggageBags) || 1,
      meetAndGreet,
      addons: addons ? [addons] : [],
      specialRequest: specialRequest || undefined,
      notes: specialRequest || undefined,
      status: initialStatus,
      fare: totalFare,
      assignedDriver: {
        name: driverName,
        phone: driverPhone,
        vehiclePlate: currentVehicle.code,
      },
    });

    closeNewBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-[580px] max-h-[90vh] bg-color-background-white rounded-2xl shadow-2xl flex flex-col justify-start items-start overflow-hidden font-['Manrope']"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching screenshot 5 */}
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
            className="size-8 flex justify-center items-center text-white/60 hover:text-white cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex-1 px-6 py-5 flex flex-col justify-start items-start gap-5 overflow-y-auto"
        >
          {/* Section 1: Customer Information */}
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
                    Full Name
                  </div>
                </div>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Tan"
                  className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] placeholder:text-slate-900/50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Phone & Email (2-column) */}
              <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                      Phone Number
                    </div>
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+65 9XXX XXXX"
                    className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] placeholder:text-slate-900/50 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                    className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] placeholder:text-slate-900/50 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                <div className="self-stretch grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "website" as BookingChannel, label: "Website", icon: Globe },
                    { id: "whatsapp" as BookingChannel, label: "WhatsApp", icon: null },
                    { id: "phone" as BookingChannel, label: "Phone Call", icon: PhoneCall },
                    { id: "email" as BookingChannel, label: "Email", icon: Mail },
                  ].map((ch) => {
                    const isSelected = channel === ch.id;
                    const Icon = ch.icon;
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
                        {Icon ? (
                          <Icon className={`size-3.5 ${isSelected ? "text-color-border-focus" : "text-gray-500"}`} />
                        ) : (
                          <div className={`size-3 rounded-full ${isSelected ? "bg-emerald-400" : "bg-color-input-placeholder"}`} />
                        )}
                        <span
                          className={`text-[10px] font-semibold font-['Manrope'] leading-4 ${
                            isSelected ? "text-color-text-inverse" : "text-color-input-placeholder"
                          }`}
                        >
                          {ch.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Selection */}
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
                    onClick={() => handleSelectVehicle(v)}
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
                        <div className="justify-start text-color-brand-primary text-xs font-semibold font-['Manrope'] leading-5">
                          {v.name}
                        </div>
                      </div>
                      <div className="pt-0.5 text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                        {v.desc}
                      </div>
                      <div className="pt-0.5 text-xs font-normal font-['Manrope'] leading-4">
                        <span className="text-color-input-placeholder">Driver: </span>
                        <span className="text-color-text-primary font-medium">{v.driver}</span>
                      </div>
                    </div>
                    <div className="pl-3 flex flex-col justify-start items-end flex-shrink-0">
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

          {/* Section 3: Assigned Driver Card */}
          <div className="self-stretch p-4 bg-color-background-selected rounded-xl outline outline-1 outline-offset-[-1px] outline-orange-400/20 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Assigned Driver
              </div>
              <div className="px-1.5 py-0.5 bg-orange-400/10 rounded-sm inline-flex flex-col justify-start items-start">
                <div className="justify-start text-orange-400 text-[10px] font-bold font-['Manrope'] leading-4 tracking-wide">
                  {currentVehicle.code}
                </div>
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                Driver Name
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                Driver Phone
              </label>
              <input
                type="text"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
              Pre-filled from vehicle. Edit only if assigning a different driver for this trip.
            </div>
          </div>

          {/* Section 4: Trip Details */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Trip Details
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-3">
              <PlacesAutocompleteInput
                label="Pickup Location"
                value={pickupLocation}
                onChange={setPickupLocation}
                placeholder="Search pickup (e.g. Changi Airport T3)..."
              />

              <PlacesAutocompleteInput
                label="Dropoff Location"
                value={dropoffLocation}
                onChange={setDropoffLocation}
                placeholder="Search dropoff (e.g. Marina Bay Sands)..."
              />

              <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col justify-start items-start gap-1">
                  <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                    Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                    Time
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col justify-start items-start gap-1">
                  <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                    Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                    Luggage Bags
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={luggageBags}
                    onChange={(e) => setLuggageBags(e.target.value)}
                    className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Meet & Greet Checkbox */}
              <div
                onClick={() => setMeetAndGreet(!meetAndGreet)}
                className="self-stretch py-2 inline-flex justify-between items-center cursor-pointer select-none"
              >
                <div className="inline-flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={meetAndGreet}
                    onChange={(e) => setMeetAndGreet(e.target.checked)}
                    className="size-4 accent-amber-600 rounded cursor-pointer"
                  />
                  <span className="justify-start text-color-text-primary text-xs font-normal font-['Manrope'] leading-5">
                    Include Meet &amp; Greet service
                  </span>
                </div>
                <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
                  +$10
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Additional Info */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-bold font-['Manrope'] uppercase leading-4 tracking-wider">
                Additional Info
              </div>
            </div>
            <div className="self-stretch pt-3 flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Add-ons
                </label>
                <input
                  type="text"
                  value={addons}
                  onChange={(e) => setAddons(e.target.value)}
                  placeholder="e.g. Child seat, newspaper"
                  className="w-full h-10 px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Special Request
                </label>
                <textarea
                  rows={2}
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Any special instructions for the driver…"
                  className="w-full px-3 py-2.5 bg-stone-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-xs text-slate-900 font-normal font-['Manrope'] focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <label className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                  Initial Status
                </label>
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <button
                    type="button"
                    onClick={() => setInitialStatus("pending")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold font-['Manrope'] leading-4 cursor-pointer transition-all ${
                      initialStatus === "pending"
                        ? "bg-amber-50 text-amber-700 outline outline-1 outline-offset-[-1px] outline-amber-200 shadow-[0px_0px_0px_2px_rgba(187,77,0,1.00)] shadow-[0px_0px_0px_1px_rgba(255,255,255,1.00)]"
                        : "bg-stone-100 text-color-input-placeholder outline outline-1 outline-offset-[-1px] outline-color-border-subtle"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => setInitialStatus("confirmed")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold font-['Manrope'] leading-4 cursor-pointer transition-all ${
                      initialStatus === "confirmed"
                        ? "bg-blue-50 text-blue-700 outline outline-1 outline-offset-[-1px] outline-blue-200 shadow-[0px_0px_0px_2px_rgba(20,71,230,1.00)] shadow-[0px_0px_0px_1px_rgba(255,255,255,1.00)]"
                        : "bg-stone-100 text-color-input-placeholder outline outline-1 outline-offset-[-1px] outline-color-border-subtle"
                    }`}
                  >
                    Confirmed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Modal Footer */}
          <div className="self-stretch -mx-6 -mb-5 px-6 py-4 bg-stone-100 border-t border-color-border-subtle inline-flex justify-between items-center flex-shrink-0 mt-2">
            <div className="inline-flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Estimated Fare
              </div>
              <div className="justify-start text-orange-400 text-xl font-bold font-['Manrope'] leading-8">
                ${totalFare} SGD
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <button
                type="button"
                onClick={closeNewBookingModal}
                className="px-5 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-border-subtle text-color-input-placeholder text-xs font-semibold font-['Manrope'] leading-5 hover:bg-stone-200/50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-color-background-accent rounded-lg text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5 hover:brightness-105 cursor-pointer transition-all"
              >
                Create Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
