"use server";

import { z } from "zod";
import { database } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

const contactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function sendMessage(data: unknown) {
  const validation = contactFormSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Invalid data provided." };
  }

  const newMessageRef = push(ref(database, "messages"));
  const newMessage = {
    ...validation.data,
    id: newMessageRef.key,
    createdAt: new Date().toISOString(),
  };

  try {
    await set(newMessageRef, newMessage);
    return { success: true };
  } catch (error) {
    console.error("Firebase write error:", error);
    return { success: false, error: "Could not save message to the database." };
  }
}
