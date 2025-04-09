import * as React from "react";

type SelectedCodesType = string[];
type SelectedCodesAction = { type: "added" | "deleted"; code: string };

export const SelectedCodesContext =
  React.createContext<SelectedCodesType | null>(null);
export const SelectedCodesDispatchContext =
  React.createContext<React.Dispatch<SelectedCodesAction> | null>(null);

export function useSelectedCodes() {
  const context = React.useContext(SelectedCodesContext);
  if (context === null) {
    throw new Error("missing selectedCodes provider");
  }

  return context;
}

export function useSelectedCodesDispatch() {
  const context = React.useContext(SelectedCodesDispatchContext);
  if (context === null) {
    throw new Error("missing selectedCodesDispatch provider");
  }

  return context;
}
