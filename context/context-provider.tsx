"use client";

import { User } from "@supabase/supabase-js";
import { createContext } from "react";

export type ContextType = {
  user: User | null;
};

export const Context = createContext<ContextType | null>(null);

export default function ContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ContextType;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
