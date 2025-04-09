import { useQuery } from "@tanstack/react-query";
import { fetchAllCodes } from "@/services/api.ts";
import { CommandSearch } from "@/components/CommandSearch.tsx";
import { GroupManager } from "@/components/GroupManager.tsx";
import { CodeBadge } from "@/components/CodeBadge.tsx";
import { useSelectedCodes } from "@/lib/selectedCodeUtils";
import { useSpinnerContext } from "@/lib/spinnerUtils";

export function MainContent() {
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context
  const { setSpinnerActive } = useSpinnerContext(); // Consume set spinner state from context

  // TanStack useQuery to query all component codes
  const allCodesResult = useQuery({
    queryKey: ["allCodes"],
    queryFn: fetchAllCodes, // Axios call to fetch all codes
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });

  let allCodes: { code: string }[] = []; // Initialize empty array for all codes
  // allCodes error path
  if (allCodesResult.isError) {
    setSpinnerActive(false);
    return (
      <small className="text-destructive">Error loading component codes</small>
    );
  }
  // allCodes pending conditional
  else if (allCodesResult.isPending) {
    setSpinnerActive(true);
  }
  // allCodes success conditional
  else if (allCodesResult.isSuccess) {
    setSpinnerActive(false);
    allCodes = allCodesResult.data;
  }

  return (
    <div className="content flex flex-1 flex-col gap-4 p-4">
      <div className="content_header flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-primary">Selected Codes</h4>
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
