"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import { PaymentForm } from "./PaymentForm";
import { useTicketPayment } from "@/hook/PaymentHook/usePaymentHook";
import useSocketData from "@/hook/socket/ticketSocketHook";
import EventDetails from "../Landing/EventDetail";
import { Event } from "@/types/ticket";

interface TicketContainerProps {
  event: Event;
}

export function TicketContainer({ event }: TicketContainerProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionReference, setTransactionReference] = useState<string | null>(null);
  
  const router = useRouter();
  const { width, height } = useWindowSize();
  const queryClient = useQueryClient();
  const initiateTicketPayment = useTicketPayment();
  
  const ticketPrice = event.ticketPrice;
  
  const user = {
    email: "user@example.com",
    phoneNumber: "",
    isAuthenticated: false 
  };

  const confirmTicketPaymentStatus = useSocketData(
    "confirmTicketPaymentStatus",
    transactionReference
  );

  useEffect(() => {
    if (transactionReference && confirmTicketPaymentStatus.paymentStatus) {
      if (confirmTicketPaymentStatus.paymentStatus === "Completed") {
        setPaymentStatus("success");
        toast.success(`Payment successful! Tickets purchased.`, {
          position: "top-right",
          autoClose: 3000,
        });
        setShowConfetti(true);
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
        setTimeout(() => {
          setShowConfetti(false);
          setTransactionReference(null);
          router.replace("/");
        }, 3000);
      } else if (confirmTicketPaymentStatus.paymentStatus === "Failed") {
        setPaymentStatus("error");
        toast.error("Payment failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  }, [transactionReference, confirmTicketPaymentStatus, router, queryClient]);

  const handleCheckout = () => {
    if (event.availableTickets === 0) {
      toast.error("No tickets available");
      return;
    }
    setShowPaymentForm(true);
  };

  const handleBackToEvent = () => {
    setShowPaymentForm(false);
  };

  if (!showPaymentForm) {
    return (
      <EventDetails
        event={event}
        onCheckout={handleCheckout}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
      
      <Button
        variant="ghost"
        onClick={handleBackToEvent}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to event
      </Button>

      <Formik
        initialValues={{
          quantity: 1,
          amount: 0,
          phoneNumber: user.phoneNumber || "",
          guestEmail: "",
          paymentMethod: "mpesa",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setPaymentStatus("initiating");
          const totalTicketPrice = ticketPrice * values.quantity;
          const serviceFee = totalTicketPrice * 0.1;
          const totalAmount = totalTicketPrice + serviceFee;
          
          const ticketDetails = {
            eventId: event._id,
            match: `${event.homeTeam} vs ${event.awayTeam}`,
            date: event.date,
            venue: event.venue,
            time: event.time,
            quantity: values.quantity,
            amount: totalAmount,
            phoneNumber: values.phoneNumber,
            paymentMethod: values.paymentMethod,
            ...(!user.isAuthenticated && {
              guestEmail: values.guestEmail,
              guestPhone: values.phoneNumber
            })
          };

          try {
            let paymentResponse;
            
            if (values.paymentMethod === "mpesa" || values.paymentMethod === "airtel") {
              paymentResponse = await initiateTicketPayment.mutateAsync(ticketDetails);
              toast.info(`STK push sent to your phone. Please complete the payment.`, {
                position: "top-right",
                autoClose: 2500,
              });
            } 
            if (paymentResponse?.reference) {
              setTransactionReference(paymentResponse.reference);
              setPaymentStatus("pending");
            }
          } /* eslint-disable @typescript-eslint/no-explicit-any */
          catch (error: any) {
            setPaymentStatus("error");
            toast.error(error.message || "Failed to initiate payment.");
          }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting, handleSubmit }) => {
          const totalTicketPrice = ticketPrice * values.quantity;
          const serviceFee = totalTicketPrice * 0.1; // 10% service fee
          const totalAmount = totalTicketPrice + serviceFee;

          return (
            <Form onSubmit={handleSubmit}>
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Purchase Ticket</CardTitle>
                      <CardDescription>Complete your payment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="quantity">Number of Tickets</Label>
                        <Field
                          name="quantity"
                          type="number"
                          as={Input}
                          min="1"
                          max={event.availableTickets}
                          /* eslint-disable @typescript-eslint/no-explicit-any */
                          onChange={(e: any) => {
                            const qty = Math.max(1, Math.min(parseInt(e.target.value) || 1, event.availableTickets));
                            setFieldValue("quantity", qty);
                          }}
                          disabled={isSubmitting || event.availableTickets === 0}
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {event.availableTickets} tickets available
                        </div>
                      </div>

                      <PaymentForm
                        values={values}
                        setFieldValue={setFieldValue}
                        email={user.email}
                        phoneNumber={user.phoneNumber}
                        amount={totalAmount}
                        isGuest={!user.isAuthenticated}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || paymentStatus === "initiating" || event.availableTickets === 0}
                      >
                        {event.availableTickets === 0 
                          ? "Sold Out" 
                          : isSubmitting || paymentStatus === "initiating"
                            ? "Initiating..."
                            : `Pay Ksh ${totalAmount.toLocaleString()}`
                        }
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* ticket Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">General Admission</p>
                        <p className="text-sm text-muted-foreground">
                          Ksh {ticketPrice.toLocaleString()} × {values.quantity}
                        </p>
                      </div>
                      <p className="font-medium">Ksh {totalTicketPrice.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Service Fee (10%)</span>
                      <span>Ksh {serviceFee.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>Ksh {totalAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">All fees included</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}