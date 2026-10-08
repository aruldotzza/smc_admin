"use client";

import React from "react";
import Image from "next/image";
import { useBookings } from "@/context/BookingContext";
import { BookingStatus } from "@/types/booking";
import { X, Phone, Mail, Globe, MessageCircle } from "lucide-react";

export default function BookingDetailsDrawer() {
  const {
    activeBooking,
    closeBookingDetails,
    updateBookingStatus,
  } = useBookings();

  if (!activeBooking) return null;

  const handleStatusChange = (newStatus: BookingStatus) => {
    updateBookingStatus(activeBooking.id, newStatus);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${activeBooking.customerName}, this is Singapore Maxicabs regarding your booking ${activeBooking.refNumber} on ${activeBooking.pickupDate} at ${activeBooking.pickupTime}.`
    );
    window.open(
      `https://wa.me/${activeBooking.phone.replace(/[^0-9]/g, "")}?text=${text}`,
      "_blank"
    );
  };

  const openDriverWhatsApp = () => {
    const phone = activeBooking.assignedDriver?.phone || activeBooking.driverAssigned?.phone;
    if (phone) {
      window.open(
        `https://wa.me/${phone.replace(/[^0-9]/g, "")}`,
        "_blank"
      );
    }
  };

  const driverName = activeBooking.assignedDriver?.name || activeBooking.driverAssigned?.name || "Ahmad Rizal";
  const driverPhone = activeBooking.assignedDriver?.phone || activeBooking.driverAssigned?.phone || "+65 9101 1234";
  const driverInitials = driverName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const statusOptions: { id: BookingStatus; label: string }[] = [
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "in_progress", label: "In-progress" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="w-full bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start overflow-hidden font-['Manrope'] flex-shrink-0 animate-in fade-in duration-200">
      {/* Top Header matching screenshot 4 */}
      <div className="self-stretch px-5 py-4 border-b border-color-border-subtle inline-flex justify-between items-center">
        <div className="inline-flex flex-col justify-start items-start">
          <div className="inline-flex justify-start items-center gap-2">
            <div className="justify-start text-orange-400 text-xs font-bold font-['Manrope'] leading-5">
              {activeBooking.refNumber}
            </div>
            <div className="px-2 py-0.5 bg-blue-50 rounded-full outline outline-1 outline-offset-[-1px] outline-blue-200 flex justify-start items-center gap-1">
              <Globe className="size-2.5 text-blue-700" />
              <div className="justify-start text-blue-700 text-[10px] font-semibold font-['Manrope'] leading-4 capitalize">
                {activeBooking.channel}
              </div>
            </div>
          </div>
          <div className="pt-0.5 flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-base font-semibold font-['Manrope'] leading-6">
              {activeBooking.customerName}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={closeBookingDetails}
          className="size-7 rounded-lg hover:bg-stone-100 flex justify-center items-center cursor-pointer transition-colors text-gray-500"
          aria-label="Close details"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Body Content matching screenshot 4 */}
      <div className="self-stretch flex flex-col justify-start items-start p-5 gap-4 overflow-y-auto">
        {/* Update Status Section */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
              Update Status
            </div>
          </div>
          <div className="self-stretch pt-2 flex flex-wrap gap-1.5">
            {statusOptions.map((st) => {
              const isActive = activeBooking.status === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleStatusChange(st.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-['Manrope'] leading-4 transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-700 outline outline-1 outline-offset-[-1px] outline-blue-200 shadow-[0px_0px_0px_2px_rgba(20,71,230,1.00)] shadow-[0px_0px_0px_1px_rgba(255,255,255,1.00)]"
                      : "bg-stone-100 text-color-input-placeholder outline outline-1 outline-offset-[-1px] outline-color-border-subtle hover:bg-stone-200/60"
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vehicle Card with Banner Image */}
        <div className="self-stretch rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start overflow-hidden">
          <div className="self-stretch h-28 relative bg-color-background-brand overflow-hidden">
            <div className="w-full h-28 left-0 top-0 absolute bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-800/60" />
            <div className="px-2 py-0.5 left-[10px] top-[13px] absolute bg-slate-900/70 rounded-md">
              <div className="justify-start text-color-text-inverse text-[10px] font-bold font-['Manrope'] leading-4 tracking-wide">
                SMC-001
              </div>
            </div>
            <div className="left-[12px] bottom-[10px] absolute inline-flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-inverse text-xs font-bold font-['Manrope'] leading-4">
                  {activeBooking.vehicleName || "6 Seater Maxi Cab"}
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-white/70 text-xs font-normal font-['Manrope'] leading-4">
                  Toyota Vellfire / Alphard
                </div>
              </div>
            </div>
          </div>

          {/* Specs grid */}
          <div className="self-stretch bg-color-background-white grid grid-cols-3 divide-x divide-gray-100">
            <div className="p-2 flex flex-col items-center justify-center">
              <div className="text-center text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Capacity
              </div>
              <div className="text-center text-orange-400 text-xs font-bold font-['Manrope'] leading-4">
                {activeBooking.passengers || 6} pax
              </div>
            </div>
            <div className="p-2 flex flex-col items-center justify-center">
              <div className="text-center text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Luggage
              </div>
              <div className="text-center text-orange-400 text-xs font-bold font-['Manrope'] leading-4">
                {activeBooking.luggageBags || 5} bags
              </div>
            </div>
            <div className="p-2 flex flex-col items-center justify-center">
              <div className="text-center text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Base Fare
              </div>
              <div className="text-center text-orange-400 text-xs font-bold font-['Manrope'] leading-4">
                ${activeBooking.fare || 65}
              </div>
            </div>
          </div>

          {/* Meet & Greet and 3h Charter */}
          <div className="self-stretch bg-stone-100 border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-2 flex flex-col items-center justify-center">
              <div className="text-center text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Meet &amp; Greet
              </div>
              <div className="text-center text-color-text-primary text-xs font-bold font-['Manrope'] leading-4">
                $75
              </div>
            </div>
            <div className="p-2 flex flex-col items-center justify-center">
              <div className="text-center text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                3h Charter
              </div>
              <div className="text-center text-color-text-primary text-xs font-bold font-['Manrope'] leading-4">
                $180
              </div>
            </div>
          </div>

          {/* Assigned Driver Row */}
          <div className="self-stretch px-3 py-2.5 bg-color-background-selected border-t border-gray-100 inline-flex justify-between items-center gap-2.5">
            <div className="size-7 bg-color-background-brand rounded-full flex justify-center items-center flex-shrink-0">
              <div className="justify-start text-color-text-inverse text-[9px] font-bold font-['Manrope'] leading-3">
                {driverInitials}
              </div>
            </div>
            <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
              <div className="self-stretch text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Assigned Driver
              </div>
              <div className="self-stretch text-color-text-primary text-xs font-semibold font-['Manrope'] leading-4 truncate">
                {driverName}
              </div>
              <div className="self-stretch text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                {driverPhone}
              </div>
            </div>
            <button
              type="button"
              onClick={openDriverWhatsApp}
              className="size-7 bg-color-status-success rounded-md flex justify-center items-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="WhatsApp driver"
            >
              <div className="size-3.5 relative overflow-hidden flex items-center justify-center">
                <div className="size-2.5 bg-white rounded-full" />
              </div>
            </button>
          </div>
        </div>

        {/* Customer Contact Card */}
        <div className="self-stretch p-3 bg-stone-100 rounded-lg flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
              Customer Contact
            </div>
          </div>

          {/* Phone */}
          <div className="self-stretch inline-flex justify-start items-center gap-2.5">
            <div className="size-7 bg-color-background-white rounded-md outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex justify-center items-center flex-shrink-0">
              <Phone className="size-3.5 text-gray-500" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start">
              <div className="self-stretch text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Phone
              </div>
              <div className="self-stretch text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                {activeBooking.phone}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="self-stretch inline-flex justify-start items-center gap-2.5">
            <div className="size-7 bg-color-background-white rounded-md outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex justify-center items-center flex-shrink-0">
              <Mail className="size-3.5 text-gray-500" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start min-w-0">
              <div className="self-stretch text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Email
              </div>
              <div className="self-stretch text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5 truncate">
                {activeBooking.email}
              </div>
            </div>
          </div>

          {/* Booked via */}
          <div className="self-stretch inline-flex justify-start items-center gap-2.5">
            <div className="size-7 bg-color-background-white rounded-md outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex justify-center items-center flex-shrink-0">
              <Globe className="size-3.5 text-gray-500" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start">
              <div className="self-stretch text-color-input-placeholder text-[10px] font-normal font-['Manrope'] leading-4">
                Booked via
              </div>
              <div className="self-stretch pt-0.5 flex flex-col justify-start items-start">
                <div className="px-2 py-0.5 bg-blue-50 rounded-full outline outline-1 outline-offset-[-1px] outline-blue-200 inline-flex items-center gap-1">
                  <div className="justify-start text-blue-700 text-[10px] font-semibold font-['Manrope'] leading-4 capitalize">
                    {activeBooking.channel}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={openWhatsApp}
            className="self-stretch py-2 mt-1 bg-color-status-success rounded-lg inline-flex justify-center items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
          >
            <div className="size-3.5 relative overflow-hidden flex items-center justify-center">
              <div className="size-2.5 bg-white rounded-full" />
            </div>
            <div className="justify-start text-color-text-inverse text-xs font-semibold font-['Manrope'] leading-4">
              WhatsApp Customer
            </div>
          </button>
        </div>

        {/* Trip Details Card */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
              Trip Details
            </div>
          </div>
          <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-2">
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Date &amp; Time
              </div>
              <div className="text-right text-color-text-primary text-xs font-medium font-['Manrope'] leading-4">
                {activeBooking.pickupDate} at {activeBooking.pickupTime}
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Passengers
              </div>
              <div className="text-right text-color-text-primary text-xs font-medium font-['Manrope'] leading-4">
                {activeBooking.passengers || 4} pax
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Luggage
              </div>
              <div className="text-right text-color-text-primary text-xs font-medium font-['Manrope'] leading-4">
                {activeBooking.luggageBags || 4} bags
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Meet &amp; Greet
              </div>
              <div className="text-right text-color-text-primary text-xs font-medium font-['Manrope'] leading-4">
                {activeBooking.meetAndGreet ? "Yes (included)" : "No"}
              </div>
            </div>
            {activeBooking.addons && activeBooking.addons.length > 0 && (
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  Add-ons
                </div>
                <div className="text-right text-color-text-primary text-xs font-medium font-['Manrope'] leading-4">
                  {activeBooking.addons.join(", ")}
                </div>
              </div>
            )}
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Total Fare
              </div>
              <div className="text-right text-orange-400 text-sm font-medium font-['Manrope'] leading-5">
                ${activeBooking.fare} SGD
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Booked on
              </div>
              <div className="text-right text-color-text-primary text-xs font-medium font-['Manrope'] leading-4">
                {activeBooking.createdAt}
              </div>
            </div>
          </div>
        </div>

        {/* Route Details Card */}
        <div className="self-stretch p-3 bg-stone-100 rounded-lg flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
              Route
            </div>
          </div>
          <div className="self-stretch pt-2 inline-flex justify-start items-start gap-2">
            <div className="w-2 pt-1 inline-flex flex-col justify-start items-center gap-1">
              <div className="size-2 bg-color-background-accent rounded-full" />
              <div className="w-0.5 h-7 bg-color-background-disabled" />
              <div className="size-2 bg-color-background-brand rounded-full" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-color-text-primary text-xs font-normal font-['Manrope'] leading-4">
                {activeBooking.pickupLocation}
              </div>
              <div className="self-stretch text-color-text-primary text-xs font-normal font-['Manrope'] leading-4">
                {activeBooking.dropoffLocation}
              </div>
            </div>
          </div>
        </div>

        {/* Special Request */}
        {(activeBooking.specialRequest || activeBooking.notes) && (
          <div className="self-stretch p-3 bg-amber-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-amber-200 flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-amber-700 text-xs font-semibold font-['Manrope'] uppercase leading-4 tracking-wide">
                Special Request
              </div>
            </div>
            <div className="self-stretch pt-1 flex flex-col justify-start items-start">
              <div className="justify-start text-amber-900 text-xs font-normal font-['Manrope'] leading-4">
                {activeBooking.specialRequest || activeBooking.notes}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
