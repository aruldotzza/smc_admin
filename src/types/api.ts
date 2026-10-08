/**
 * TypeScript definitions for Singapore Maxicabs API
 * Matching all 24 endpoint contracts from frontend-api-handoff.html
 */

// ==========================================
// 1. Vehicle & Price Types (Public Catalog)
// ==========================================

export interface VehiclePriceItem {
  catalogId: number;
  serviceId: number;
  amount: number;
  amountMinor?: number;
  currency: string;
  validFrom?: string | null;
  validTo?: string | null;
  status: "active" | "inactive" | string;
  isFrom?: boolean;
  unit: "trip" | "hour";
  serviceName: string;
  minimumHours?: number | null;
}

export interface VehiclePrices {
  arrival?: VehiclePriceItem;
  departure_transfer?: VehiclePriceItem;
  hourly?: VehiclePriceItem;
  [serviceCode: string]: VehiclePriceItem | undefined;
}

export interface ApiVehicle {
  id: number;
  name: string;
  description?: string | null;
  passengerCapacity: number | null;
  luggageCapacity: number | null;
  currency: string;
  vehicleTypeId?: number | null;
  vehicleType?: string | null;
  imageUrl?: string | null;
  status: "active" | "inactive";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  prices: VehiclePrices;
  recommendation?: boolean;
}

export interface VehiclesResponse {
  success: boolean;
  requirements?: {
    persons: number;
    luggage: number;
  } | null;
  data: ApiVehicle[];
}

export interface SingleVehicleResponse {
  vehicle: ApiVehicle;
}

// ==========================================
// 2. Services & Vehicle Types
// ==========================================

export interface ApiService {
  id: number;
  code: string;
  name: string;
  unit: "trip" | "hour";
  status: "active" | "inactive";
  sortOrder: number;
}

export interface ServicesResponse {
  services: ApiService[];
}

export interface ApiVehicleType {
  id: number;
  name: string;
  description?: string | null;
}

export interface VehicleTypesResponse {
  vehicleTypes: ApiVehicleType[];
}

export interface CatalogPriceResponse {
  catalog: {
    catalogId: number;
    vehicleId: number;
    vehicleName: string;
    currency: string;
    service: string;
    price: VehiclePriceItem;
  };
}

// ==========================================
// 3. Add-ons (Extras)
// ==========================================

export interface ApiAddOn {
  id: number;
  code: string;
  name: string;
  description?: string;
  pricing_type: "FIXED" | "PER_STOP";
  price: number;
  currency: string;
  status: "ACTIVE" | "INACTIVE";
  created_at?: string;
  updated_at?: string;
}

export interface AddOnsResponse {
  success: boolean;
  data: ApiAddOn[];
}

export interface SingleAddOnResponse {
  success: boolean;
  add_on: ApiAddOn;
}

// ==========================================
// 4. Quotation & Checkout Flow
// ==========================================

export interface AddOnSelection {
  add_on_id: number;
  quantity: number;
}

export interface QuoteRequest {
  vehicle_id: number;
  service_id: number;
  pickup: {
    address: string;
  };
  drop: {
    address: string;
  };
  add_ons: AddOnSelection[];
  hours?: number;
}

export interface QuoteCalculatedAddon {
  id: number;
  code: string;
  name: string;
  pricing_type: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface QuoteResponse {
  success: boolean;
  quote_status: "AVAILABLE" | "CONTACT_SUPPORT";
  quote?: {
    vehicle: {
      id: number;
      name: string;
      price: number;
    };
    service: {
      id: number;
      name: string;
      unit: string;
    };
    catalog_id: number;
    add_ons: QuoteCalculatedAddon[];
    distance?: {
      distance_km: number;
      base_charge: number;
      distance_surcharge: number;
      total_distance_charge: number;
    };
    total_fare: number;
    currency: string;
  };
  route?: {
    pickup: string;
    drop: string;
    distance_km?: number;
  };
  distance?: {
    value: number;
    unit: string;
  };
  message?: string;
  whatsapp?: {
    enabled: boolean;
  };
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface CheckoutRequest {
  customer: CustomerInfo;
  vehicle_id: number;
  service_id: number;
  pickup: {
    address: string;
  };
  drop: {
    address: string;
  };
  add_ons: AddOnSelection[];
  payment_method: "STRIPE";
  hours?: number;
}

export interface CheckoutResponse {
  success: boolean;
  booking_id?: string;
  payment_status?: "PENDING" | "PAID" | "FAILED";
  amount?: number;
  currency?: string;
  stripe_checkout_url?: string;
  quote_status?: "CONTACT_SUPPORT";
  message?: string;
}

// ==========================================
// 5. Admin Management Payloads
// ==========================================

export interface AdminCreateVehiclePayload {
  name: string;
  description?: string;
  passengerCapacity?: number | null;
  luggageCapacity?: number | null;
  currency: string;
  vehicleTypeId?: number | null;
  imageUrl?: string | null;
  status?: "active" | "inactive";
  prices: {
    [serviceCode: string]: {
      amount: number;
      isFrom?: boolean;
      minimumHours?: number | null;
    };
  };
}

export interface AdminUpdateVehiclePayload {
  name?: string;
  description?: string;
  passengerCapacity?: number | null;
  luggageCapacity?: number | null;
  status?: "active" | "inactive";
  isActive?: boolean;
  vehicleTypeId?: number | null;
  imageUrl?: string | null;
}

export interface AdminSetPricePayload {
  amount: number;
  currency?: string;
  isFrom?: boolean;
  minimumHours?: number | null;
  validFrom?: string | null;
  validTo?: string | null;
  status?: "active" | "inactive";
}

export interface AdminCreateVehicleTypePayload {
  name: string;
  description?: string;
}

export interface AdminUpdateVehicleTypePayload {
  name?: string;
  description?: string;
}

export interface AdminCreateServicePayload {
  code: string;
  name: string;
  unit: "trip" | "hour";
  sortOrder?: number;
  status?: "active" | "inactive";
}

export interface AdminUpdateServicePayload {
  name?: string;
  sortOrder?: number;
  status?: "active" | "inactive";
}

export interface AdminCreateAddOnPayload {
  code: string;
  name: string;
  description?: string;
  pricing_type: "FIXED" | "PER_STOP";
  price: number;
  currency?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface AdminUpdateAddOnPayload {
  name?: string;
  description?: string;
  pricing_type?: "FIXED" | "PER_STOP";
  price?: number;
  currency?: string;
  status?: "ACTIVE" | "INACTIVE";
}

// ==========================================
// 6. Admin Distance Pricing Rules
// ==========================================

export interface ApiDistanceRule {
  id: number;
  min_distance_km: number;
  max_distance_km: number | null;
  min_inclusive: boolean;
  max_inclusive: boolean;
  surcharge: number;
  currency: string;
  is_contact_support: boolean;
  status: "ACTIVE" | "INACTIVE";
  created_at?: string;
  updated_at?: string;
}

export interface DistanceRulesResponse {
  success: boolean;
  data: ApiDistanceRule[];
}

export interface SingleDistanceRuleResponse {
  success: boolean;
  distance_rule: ApiDistanceRule;
}

export interface AdminCreateDistanceRulePayload {
  min_distance_km: number;
  max_distance_km: number | null;
  min_inclusive?: boolean;
  max_inclusive?: boolean;
  surcharge: number;
  currency?: string;
  is_contact_support?: boolean;
  status?: "ACTIVE" | "INACTIVE";
}

export interface AdminUpdateDistanceRulePayload {
  min_distance_km?: number;
  max_distance_km?: number | null;
  min_inclusive?: boolean;
  max_inclusive?: boolean;
  surcharge?: number;
  currency?: string;
  is_contact_support?: boolean;
  status?: "ACTIVE" | "INACTIVE";
}

// ==========================================
// 7. Operations & Error Contract
// ==========================================

export interface HealthResponse {
  status: "ok" | string;
}

export interface ReadyResponse {
  status: "ok" | string;
  database?: "connected" | string;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
  status?: number;
}
