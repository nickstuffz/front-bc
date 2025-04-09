import * as React from "react";
import { SpinnerContext } from "@/lib/spinnerUtils";

export function SpinnerProvider({ children }: { children: React.ReactNode }) {
  const [spinnerActive, setSpinnerActive] = React.useState(false);

  return (
    <SpinnerContext.Provider value={{ spinnerActive, setSpinnerActive }}>
      {children}
    </SpinnerContext.Provider>
  );
}
