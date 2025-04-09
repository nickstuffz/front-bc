import * as React from "react";
import {
  SelectedCodesContext,
  SelectedCodesDispatchContext,
} from "@/lib/selectedCodeContext";

type SelectedCodesType = string[];
type SelectedCodesAction = { type: "added" | "deleted"; code: string };

export function SelectedCodesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCodes, dispatch] = React.useReducer(selectedCodesReducer, []);

  return (
    <SelectedCodesContext.Provider value={selectedCodes}>
      <SelectedCodesDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedCodesDispatchContext.Provider>
    </SelectedCodesContext.Provider>
  );
}

function selectedCodesReducer(
  selectedCodes: SelectedCodesType,
  action: SelectedCodesAction,
) {
  switch (action.type) {
    case "added": {
      return [...selectedCodes, action.code];
    }
    case "deleted": {
      return selectedCodes.filter((code) => code !== action.code);
    }
    default: {
      throw Error("unknown action: " + action.type);
    }
  }
}
