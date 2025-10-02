import { initiateTicketPayment } from "@/lib/api";
import { paymentError, paymentResponse, ticketPayment } from "@/types/payment";
import { useMutation, UseMutationResult } from "@tanstack/react-query";


export function useTicketPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  ticketPayment
> {
  return useMutation<paymentResponse, paymentError, ticketPayment>({
    mutationFn: initiateTicketPayment,
    // onSuccess: (data) => {
    //   console.log("Payment initiated successfully:", data);
    // },
    // onError: (error: paymentError) => {
    //   console.error("Payment initiation error:", error.message);
    // },
  });
}

