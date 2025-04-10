import * as React from "react";
import { SpinnerStateContext, SpinnerActionContext } from "@/lib/spinnerUtils";

export function SpinnerProvider({ children }: { children: React.ReactNode }) {
  const [spinnerActive, setSpinnerActive] = React.useState(false);

  return (
    <SpinnerActionContext.Provider value={setSpinnerActive}>
      <SpinnerStateContext.Provider value={spinnerActive}>
        {children}
      </SpinnerStateContext.Provider>
    </SpinnerActionContext.Provider>
  );
}
