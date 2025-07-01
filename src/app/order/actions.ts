"use server";

import { z } from "zod";
import { database } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

const orderFormSchema = z.object({
  ucPack: z.string().min(1),
  playerId: z.string().min(5),
  loginMethod: z.string().min(1),
  buyerName: z.string().min(2),
  upiNumber: z.string().min(5),
});

export async function placeOrder(data: unknown) {
  const validation = orderFormSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Invalid data provided." };
  }

  const newOrderRef = push(ref(database, "orders"));
  const newOrder = {
    ...validation.data,
    id: newOrderRef.key,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  try {
    await set(newOrderRef, newOrder);
    // Create a fake, more readable order ID for the user
    const fakeOrderId = `XPUC-${String(Date.now()).slice(-6)}`;
    return { success: true, orderId: fakeOrderId };
  } catch (error) {
    console.error("Firebase write error:", error);
    return { success: false, error: "Could not save order to the database." };
  }
}
