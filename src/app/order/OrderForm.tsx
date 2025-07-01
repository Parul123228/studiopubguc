"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ucPacks, loginMethods } from "@/lib/constants";
import { placeOrder } from "./actions";
import { CheckCircle, Loader2 } from "lucide-react";

const orderFormSchema = z.object({
  ucPack: z.string().min(1, { message: "Please select a UC pack." }),
  playerId: z.string().min(5, { message: "Player ID must be at least 5 characters." }),
  loginMethod: z.string().min(1, { message: "Please select a login method." }),
  buyerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  upiNumber: z.string().min(5, { message: "Please enter a valid UPI ID or Number." }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export function OrderForm() {
  const searchParams = useSearchParams();
  const selectedPack = searchParams.get("pack") || "";
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      ucPack: selectedPack,
      playerId: "",
      loginMethod: "",
      buyerName: "",
      upiNumber: "",
    },
  });

  async function onSubmit(data: OrderFormValues) {
    setIsLoading(true);
    try {
      const result = await placeOrder(data);
      if (result.success && result.orderId) {
        setOrderId(result.orderId);
      } else {
        throw new Error(result.error || "Failed to place order.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (orderId) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm card-glow-border text-center p-8">
        <CardContent className="space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold font-headline text-primary">Order Placed Successfully!</h2>
          <p className="text-muted-foreground">Your order has been received. You will get your UC shortly.</p>
          <p className="text-lg">
            Your Order ID: <span className="font-bold text-primary text-glow">{orderId}</span>
          </p>
          <Button onClick={() => window.location.reload()}>Place Another Order</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm card-glow-border">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ucPack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UC Pack</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a UC pack" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ucPacks.map((pack) => (
                        <SelectItem key={pack.name} value={pack.name}>
                          {pack.name} - ₹{pack.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="playerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PUBG Player ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your in-game Player ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loginMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select login method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loginMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upiNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPay/PhonePe/UPI Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your UPI ID or registered number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold text-lg py-6 button-glow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
