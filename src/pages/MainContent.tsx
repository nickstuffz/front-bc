import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCodes } from "@/services/api.ts";
import { CommandSearch } from "@/components/CommandSearch.tsx";
import { GroupManager } from "@/components/GroupManager.tsx";
import { CodeBadge } from "@/components/CodeBadge.tsx";
import {
  useSelectedCodes,
  useSelectedCodesDispatch,
} from "@/lib/selectedCodeUtils";
import { useSpinnerAction } from "@/lib/spinnerUtils";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainContent() {
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context
  const dispatch = useSelectedCodesDispatch(); // Consume selected codes dispatch from context
  const setSpinnerActive = useSpinnerAction(); // Consume set spinner state from context

  // TanStack useQuery to query all component codes
  const allCodesResult = useQuery({
    queryKey: ["allCodes"],
    queryFn: fetchAllCodes, // Axios call to fetch all codes
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
    placeholderData: [], // Placeholder data
  });

  // Spinner state management on allCodesResult status
  React.useEffect(() => {
    if (allCodesResult.isPlaceholderData) {
      setSpinnerActive(true);
    } else {
      setSpinnerActive(false);
    }
  }, [allCodesResult.isPlaceholderData, setSpinnerActive]);

  // allCodes error path
  if (allCodesResult.isError) {
    return (
      <small className="text-destructive">Error loading component codes</small>
    );
  }

  // allCodes success conditional
  if (allCodesResult.isSuccess) {
    const allCodes = allCodesResult.data;

    return (
      <div className="content flex flex-1 flex-col gap-4 p-4">
        <div className="content_header flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-primary border-1 border-dashed border-blue-400 p-1 text-xs">
              Shimano Compatibility <br />
              2024-2025 ver. 3.0
            </div>
            <CommandSearch allCodes={allCodes} />
          </div>

          <div className="flex flex-col gap-2 rounded-tr-md border-t-1 border-r-1 pt-2">
            <div className="flex items-center gap-2">
              <h4>Selected Codes</h4>
              <Button
                className="h-7 w-7"
                variant="outline"
                size="icon"
                onClick={() => dispatch({ type: "clear" })}
              >
                <RefreshCcw className="" />
              </Button>
            </div>
            <div className="badge_container flex flex-1 flex-wrap gap-2">
              {selectedCodes.map((codeObj) => (
                <CodeBadge key={codeObj.code} codeObj={codeObj} />
              ))}
            </div>
          </div>
        </div>
        <GroupManager />
      </div>
    );
  } else {
    return <small className="text-destructive">Unexpected state error.</small>;
  }
}
