"use client";

import React from "react";
import { useBookings } from "@/context/BookingContext";
import { Booking } from "@/types/booking";

export default function BookingsTable() {
  const { filteredBookings, activeBookingId, openBookingDetails } = useBookings();

  const getSourceBadge = (channel: Booking["channel"]) => {
    switch (channel) {
      case "website":
        return {
          bg: "bg-blue-50 outline-blue-200 text-blue-700",
          text: "Website",
        };
      case "whatsapp":
        return {
          bg: "bg-green-50 outline-green-200 text-green-700",
          text: "WhatsApp",
        };
      case "phone":
      default:
        return {
          bg: "bg-purple-50 outline-purple-200 text-purple-700",
          text: "Phone Call",
        };
    }
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-blue-50 outline-blue-200 text-blue-700",
          text: "Confirmed",
        };
      case "pending":
        return {
          bg: "bg-amber-50 outline-amber-200 text-amber-700",
          text: "Pending",
        };
      case "in_progress":
        return {
          bg: "bg-purple-50 outline-purple-200 text-purple-700",
          text: "In-progress",
        };
      case "completed":
        return {
          bg: "bg-green-50 outline-green-200 text-green-700",
          text: "Completed",
        };
      case "cancelled":
        return {
          bg: "bg-stone-100 outline-color-border-subtle text-color-input-placeholder",
          text: "Cancelled",
        };
    }
  };

  if (filteredBookings.length === 0) {
    return (
      <div className="w-full bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle p-12 text-center flex flex-col items-center justify-center">
        <div className="justify-start text-color-text-primary text-sm font-semibold font-['Manrope']">
          No bookings found
        </div>
        <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] mt-1">
          Try adjusting your search criteria or status filter.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start overflow-hidden font-['Manrope']">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-stone-100 border-b border-color-border-subtle text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase tracking-wide">
              <th className="w-44 h-10 px-4 py-3">Ref / Customer</th>
              <th className="w-48 h-10 px-4 py-3">Contact</th>
              <th className="w-72 h-10 px-4 py-3">Route</th>
              <th className="w-36 h-10 px-4 py-3">Date</th>
              <th className="w-40 h-10 px-4 py-3">Source</th>
              <th className="w-36 h-10 px-4 py-3">Status</th>
              <th className="w-24 h-10 px-4 py-3">Fare</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {filteredBookings.map((booking: Booking) => {
              const isSelected = booking.id === activeBookingId;
              const srcBadge = getSourceBadge(booking.channel);
              const statBadge = getStatusBadge(booking.status);

              return (
                <tr
                  key={booking.id}
                  onClick={() => openBookingDetails(booking.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-color-background-selected"
                      : "hover:bg-stone-50/80"
                  }`}
                >
                  {/* Ref / Customer */}
                  <td className="w-44 px-4 py-3">
                    <div className="w-36 flex flex-col justify-start items-start">
                      <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
                        {booking.refNumber}
                      </div>
                    </div>
                    <div className="w-36 flex flex-col justify-start items-start">
                      <div className="justify-start text-color-text-primary text-xs font-medium font-['Manrope'] leading-5 truncate">
                        {booking.customerName}
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="w-48 px-4 py-3">
                    <div className="w-40 flex flex-col justify-start items-start">
                      <div className="justify-start text-color-text-primary text-xs font-normal font-['Manrope'] leading-4">
                        {booking.phone}
                      </div>
                    </div>
                    <div className="w-40 h-4 max-w-40 flex flex-col justify-start items-start overflow-hidden">
                      <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4 truncate">
                        {booking.email}
                      </div>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="w-72 px-4 py-3">
                    <div className="w-64 h-4 max-w-64 flex flex-col justify-start items-start overflow-hidden">
                      <div className="self-stretch justify-start text-color-text-primary text-xs font-normal font-['Manrope'] leading-4 truncate">
                        {booking.pickupLocation}
                      </div>
                    </div>
                    <div className="w-64 h-4 max-w-64 flex flex-col justify-start items-start overflow-hidden">
                      <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4 truncate">
                        → {booking.dropoffLocation}
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="w-36 px-4 py-3">
                    <div className="w-28 flex flex-col justify-start items-start">
                      <div className="justify-start text-color-text-primary text-xs font-normal font-['Manrope'] leading-4">
                        {booking.pickupDate}
                      </div>
                    </div>
                    <div className="w-28 flex flex-col justify-start items-start">
                      <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                        {booking.pickupTime}
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="w-40 px-4 py-3">
                    <div
                      className={`px-2 py-0.5 rounded-full outline outline-1 outline-offset-[-1px] inline-flex justify-start items-center gap-1 ${srcBadge.bg}`}
                    >
                      <div className="text-[10px] font-semibold font-['Manrope'] leading-4">
                        {srcBadge.text}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="w-36 px-4 py-3">
                    <div
                      className={`px-2.5 py-0.5 rounded-full outline outline-1 outline-offset-[-1px] inline-flex justify-start items-center ${statBadge.bg}`}
                    >
                      <div className="text-[10px] font-semibold font-['Manrope'] leading-4">
                        {statBadge.text}
                      </div>
                    </div>
                  </td>

                  {/* Fare */}
                  <td className="w-24 px-4 py-3">
                    <div className="justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                      ${booking.fare}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
