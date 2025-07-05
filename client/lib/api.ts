// API utility functions for KlixGenix.ID

import { supabase } from "./supabase";

const API_BASE_URL = "/api";

interface LoginResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    plan?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
  };
  token: string;
}

interface PaymentResponse {
  redirectUrl?: string;
  bankInstructions?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    amount: string;
    code: string;
  };
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "API call failed");
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("API call error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan yang tidak diketahui",
    };
  }
}

export const authAPI = {
  login: async (formData: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  },

  register: async (userData: {
    email: string;
    password: string;
    full_name: string;
    phone: string;
    confirmPassword?: string;
  agreeTerms?: boolean;
  agreeMarketing?: boolean;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.full_name,
          phone: userData.phone,
        },
      },
    });

    if (error) return { success: false, error };
    return { success: true, data };
  },

  logout: async () => {
    await supabase.auth.signOut();
  },
};

export const paymentAPI = {
  createPayment: async (paymentData: {
    plan: string;
    paymentMethod: string;
    fullName: string;
    email: string;
    phone: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardName?: string;
    bankAccount?: string;
    walletPhone?: string;
  }) => {
    return apiCall<PaymentResponse>("/payment/create", {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  },

  verifyPayment: async (paymentId: string) => {
    return apiCall(`/payment/verify/${paymentId}`, {
      method: "GET",
    });
  },

  getPaymentHistory: async () => {
    return apiCall("/payment/history", {
      method: "GET",
    });
  },

  cancelSubscription: async () => {
    return apiCall("/payment/cancel-subscription", {
      method: "POST",
    });
  },
};

export const handleAPIError = (error: any) => {
  if (error?.message) {
    return error.message;
  }
  return "Terjadi kesalahan yang tidak diketahui";
};
