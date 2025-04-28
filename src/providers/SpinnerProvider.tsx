import * as React from "react";
import {
  SpinnerStateContext,
  SpinnerActionContext,
} from "@/providers/spinnerContext";

export function SpinnerProvider({ children }: { children: React.ReactNode }) {
  const [spinnerActive, setSpinnerActive] = React.useState(false);

  return (
    <SpinnerStateContext.Provider value={spinnerActive}>
      <SpinnerActionContext.Provider value={setSpinnerActive}>
        {children}
      </SpinnerActionContext.Provider>
    </SpinnerStateContext.Provider>
  );
}
