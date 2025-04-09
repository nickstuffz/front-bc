import * as React from "react";

type SpinnerContextType = {
  spinnerActive: boolean;
  setSpinnerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SpinnerContext = React.createContext<SpinnerContextType | null>(
  null,
);

export function useSpinnerContext() {
  const context = React.useContext(SpinnerContext);
  if (!context) {
    throw new Error("missing SpinnerContext provider");
  }
  return context;
}
