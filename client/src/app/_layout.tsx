import { Stack } from "expo-router";

// expo-router uses this file as the root layout for every route under
// src/app. A bare <Stack /> gives us native stack navigation (push/back)
// between the screens defined by index.tsx and finder.tsx.
export default function RootLayout() {
  return <Stack />;
}
