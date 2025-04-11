import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCodes } from "@/services/api.ts";
import { CommandSearch } from "@/components/CommandSearch.tsx";
import { GroupManager } from "@/components/GroupManager.tsx";
import { CodeBadge } from "@/components/CodeBadge.tsx";
import { useSelectedCodes } from "@/lib/selectedCodeUtils";
import { useSpinnerAction } from "@/lib/spinnerUtils";

export function MainContent() {
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context
  const setSpinnerActive = useSpinnerAction(); // Consume set spinner state from context

  // console.log("maincontent render", selectedCodes);

  // TanStack useQuery to query all component codes
  const allCodesResult = useQuery({
    queryKey: ["allCodes"],
    queryFn: fetchAllCodes, // Axios call to fetch all codes
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });

  // Spinner state management on allCodesResult status
  React.useEffect(() => {
    if (allCodesResult.isPending) {
      setSpinnerActive(true);
    } else {
      setSpinnerActive(false);
    }
  }, [allCodesResult.isPending, setSpinnerActive]);

  let allCodes: { code: string }[] = []; // Initialize empty array for all codes
  // allCodes error path
  if (allCodesResult.isError) {
    return (
      <small className="text-destructive">Error loading component codes</small>
    );
  }

  // allCodes success conditional, NO RETURN
  if (allCodesResult.isSuccess) {
    allCodes = allCodesResult.data;
  }

  return (
    <div className="content flex flex-1 flex-col gap-4 p-4">
      <div className="content_header flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4>Selected Codes</h4>
          <CommandSearch allCodes={allCodes} />
        </div>
        <div className="badge_container flex flex-1 flex-wrap gap-2">
          {selectedCodes.map((code) => (
            <CodeBadge key={code} code={code} />
          ))}
        </div>
      </div>

      <GroupManager />
    </div>
  );
}
