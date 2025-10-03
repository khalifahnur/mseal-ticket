"use client";

import { Field, ErrorMessage } from "formik";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PaymentFormProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  email?: string;
  phoneNumber?: string | null;
  amount: number;
  isGuest?: boolean;
}

export function PaymentForm({ values, setFieldValue, amount, isGuest = false }: PaymentFormProps) {
  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      description: "Pay with M-Pesa mobile money",
      popular: true,
      imgUrl: "/mpesa.png",
    },
    {
      id: "airtel",
      name: "Airtel",
      description: "Pay with airtel mobile money",
      popular: false,
      imgUrl: "/airtel.png",
    },
  ];

  return (
    <div className="space-y-6 md:grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          Complete your payment of{" "}
          <span className="font-medium">Ksh. {amount.toLocaleString()}</span>
        </p>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Choose Payment Method</Label>
          <Field name="paymentMethod">
            {/* eslint-disable @typescript-eslint/no-explicit-any  */}
            {({ field }: any) => (
              <RadioGroup
                value={field.value}
                onValueChange={(value) => setFieldValue("paymentMethod", value)}
                className="grid grid-rows-3 gap-2"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center justify-between gap-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={method.imgUrl}
                          alt={method.name}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.popular && (
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </Field>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {values.paymentMethod === "mpesa" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                An M-Pesa STK push will be sent to your phone to complete the payment.
              </p>

              {isGuest && (
                <div>
                  <Label htmlFor="guestEmail" className="text-sm font-medium">Email</Label>
                  <Field
                    name="guestEmail"
                    as={Input}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="guestEmail"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Field
                    name="phoneNumber"
                    as={Input}
                    className="pl-10"
                    placeholder="+254XXXXXXXXX"
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Enter your M-Pesa registered phone number
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>
            </div>
          )}

          {values.paymentMethod === "msealwallet" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pay using your mseal wallet service.
              </p>
              <div className="bg-amber-50 border border-primary rounded-lg p-4">
                <h4 className="font-medium text-amber-900 mb-2">
                  Payment Process
                </h4>
                <p className="text-sm text-amber-800">
                  Your Mseal Wallet will be debited automatically. Please confirm and complete this payment.
                </p>
              </div>
            </div>
          )}

          {values.paymentMethod === "airtel" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                An Airtel Money STK push will be sent to your phone to complete the payment.
              </p>

              {isGuest && (
                <div>
                  <Label htmlFor="guestEmail" className="text-sm font-medium">Email</Label>
                  <Field
                    name="guestEmail"
                    as={Input}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="guestEmail"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Field
                    name="phoneNumber"
                    as={Input}
                    className="pl-10"
                    placeholder="254XXXXXXXXX"
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Enter your Airtel registered phone number
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}