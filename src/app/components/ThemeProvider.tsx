"use client";

import { type ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";
import * as React from "react";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

export function ThemeProvider({
  children,
  ...props
}: Omit<ThemeProviderProps, "attribute"> & {
  attribute?: "class" | "data-theme";
}) {
  return (
    <NextThemesProvider {...props} attribute={props.attribute || "class"}>
      {children}
    </NextThemesProvider>
  );
}
