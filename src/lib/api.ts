import { paymentResponse, ticketPayment } from "@/types/payment";
import apiClient from "./apiClient";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchUserInfo() {
  try {
    const response = await apiClient.get("/auth-user/fetch-other-info");
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // User is not logged in
      return null;
    } else if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching user info.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateTicketPayment = async (
  data: ticketPayment
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/initiate-ticket-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchTickets() {
  try {
    const response = await apiClient.get("/event/fetch-upcoming-events");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching all events.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
}