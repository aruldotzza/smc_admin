"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBookings } from "@/context/BookingContext";
import { Booking } from "@/types/booking";

export default function RecentBookingsTable() {
  const router = useRouter();
  const { bookings, openBookingDetails } = useBookings();
  const recentList = bookings.slice(0, 6);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-50 outline-amber-200 text-amber-700",
          text: "Pending",
          width: "w-14",
        };
      case "confirmed":
        return {
          bg: "bg-blue-50 outline-blue-200 text-blue-700",
          text: "Confirmed",
          width: "w-16",
        };
      case "in_progress":
        return {
          bg: "bg-purple-50 outline-purple-200 text-purple-700",
          text: "In-progress",
          width: "w-20",
        };
      case "completed":
        return {
          bg: "bg-green-50 outline-green-200 text-green-700",
          text: "Completed",
          width: "w-16",
        };
      case "cancelled":
        return {
          bg: "bg-stone-100 outline-color-border-subtle text-color-input-placeholder",
          text: "Cancelled",
          width: "w-16",
        };
    }
  };

  const handleRowClick = (bookingId: string) => {
    openBookingDetails(bookingId);
    router.push("/bookings");
  };

  return (
    <div className="self-stretch bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Header */}
      <div className="self-stretch px-5 py-4 border-b border-color-border-subtle inline-flex justify-between items-center">
        <div className="inline-flex flex-col justify-start items-start">
          <div className="justify-start text-color-text-primary text-base font-bold font-['Manrope'] leading-6">
            Recent Bookings
          </div>
        </div>
        <Link
          href="/bookings"
          className="inline-flex flex-col justify-start items-start hover:opacity-80 transition-opacity"
        >
          <div className="justify-start text-orange-400 text-xs font-semibold font-['Manrope'] leading-4">
            View all →
          </div>
        </Link>
      </div>

      {/* Rows */}
      <div className="self-stretch flex flex-col justify-start items-start">
        {recentList.map((booking, idx) => {
          const badge = getStatusBadge(booking.status);
          const isLast = idx === recentList.length - 1;

          return (
            <div
              key={booking.id}
              onClick={() => handleRowClick(booking.id)}
              className={`self-stretch px-5 py-3.5 ${
                isLast ? "" : "border-b border-gray-100"
              } inline-flex justify-start items-center gap-3 hover:bg-[#EEF5FB]/40 transition-colors cursor-pointer`}
            >
              {/* Avatar */}
              <div className="size-8 bg-color-background-brand rounded-full flex justify-center items-center flex-shrink-0">
                <div className="inline-flex flex-col justify-start items-start">
                  <div className="justify-start text-color-text-inverse text-[10px] font-bold font-['Manrope'] leading-4">
                    {getInitials(booking.customerName)}
                  </div>
                </div>
              </div>

              {/* Customer & Route */}
              <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
                <div className="self-stretch h-5 flex flex-col justify-start items-start overflow-hidden">
                  <div className="justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5 truncate">
                    {booking.customerName}
                  </div>
                </div>
                <div className="self-stretch h-4 flex flex-col justify-start items-start overflow-hidden">
                  <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4 truncate">
                    {booking.pickupLocation} → {booking.dropoffLocation}
                  </div>
                </div>
              </div>

              {/* Status & Date */}
              <div className="flex flex-col justify-start items-end flex-shrink-0">
                <div className="h-6 flex items-center justify-end">
                  <div
                    className={`h-5 px-2.5 flex items-center justify-center rounded-full outline outline-1 outline-offset-[-1px] ${badge.bg}`}
                  >
                    <div className="text-right justify-start text-[10px] font-semibold font-['Manrope'] leading-4">
                      {badge.text}
                    </div>
                  </div>
                </div>
                <div className="h-5 pt-0.5 flex flex-col justify-start items-end">
                  <div className="text-right justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                    {booking.pickupDate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
