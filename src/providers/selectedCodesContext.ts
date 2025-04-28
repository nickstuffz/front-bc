import * as React from "react";

import { CodeObjType } from "@/types/types";

type SelectedCodesType = CodeObjType[];
type SelectedCodesAction =
  | { type: "added" | "deleted" | "clear"; codeObj: CodeObjType }
  | { type: "clear" };

export const SelectedCodesContext =
  React.createContext<SelectedCodesType | null>(null);
export const SelectedCodesDispatchContext =
  React.createContext<React.Dispatch<SelectedCodesAction> | null>(null);

export function useSelectedCodes() {
  const context = React.useContext(SelectedCodesContext);
  if (context === null) {
    throw new Error("missing SelectedCodes provider");
  }

  return context;
}

export function useSelectedCodesDispatch() {
  const context = React.useContext(SelectedCodesDispatchContext);
  if (context === null) {
    throw new Error("missing SelectedCodesDispatch provider");
  }

  return context;
}

export function selectedCodesReducer(
  selectedCodes: SelectedCodesType,
  action: SelectedCodesAction,
) {
  switch (action.type) {
    case "added": {
      return [...selectedCodes, action.codeObj];
    }
    case "deleted": {
      return selectedCodes.filter(
        (codeObj) => codeObj.code !== action.codeObj.code,
      );
    }
    case "clear": {
      return [];
    }
  }
}
