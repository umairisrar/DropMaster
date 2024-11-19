"use server";
import { auth } from "@clerk/nextjs/server";

export const checkAuthentication = async () => {
  const { userId } = auth();
  return userId || undefined;
};
