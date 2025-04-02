import * as React from "react";

type SelectedCodesType = string[];
type SelectedCodesAction = { type: "added" | "deleted"; code: string };

const SelectedCodesContext = React.createContext<SelectedCodesType | null>(
  null,
);
const SelectedCodesDispatchContext =
  React.createContext<React.Dispatch<SelectedCodesAction> | null>(null);

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
