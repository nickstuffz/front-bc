import * as React from "react";
import {
  SelectedCodesContext,
  SelectedCodesDispatchContext,
  selectedCodesReducer,
} from "@/lib/selectedCodeUtils";

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
