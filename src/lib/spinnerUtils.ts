import * as React from "react";

export const SpinnerStateContext = React.createContext<boolean | null>(null);

export const SpinnerActionContext = React.createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export function useSpinnerState() {
  const context = React.useContext(SpinnerStateContext);
  if (context === null) {
    throw new Error("missing SpinnerStateContext provider");
  }
  return context;
}

export function useSpinnerAction() {
  const context = React.useContext(SpinnerActionContext);
  if (context === null) {
    throw new Error("missing SpinnerActionContext provider");
  }
  return context;
}
