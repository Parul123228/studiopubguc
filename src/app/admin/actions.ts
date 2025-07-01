"use server";

import { database } from "@/lib/firebase";
import { ref, update } from "firebase/database";
import { z } from "zod";

const statusSchema = z.enum(["Pending", "Delivered"]);

export async function updateOrderStatus(orderId: string, status: "Pending" | "Delivered") {
  if (!orderId || !status) {
    throw new Error("Order ID and status are required.");
  }
  
  const validation = statusSchema.safeParse(status);
  if(!validation.success) {
    throw new Error("Invalid status provided.");
  }

  const orderRef = ref(database, `orders/${orderId}`);
  
  try {
    await update(orderRef, { status: validation.data });
    return { success: true };
  } catch (error) {
    console.error("Firebase update error:", error);
    throw new Error("Could not update order status in the database.");
  }
}
