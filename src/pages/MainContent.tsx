import { useQuery } from "@tanstack/react-query";
import { fetchAllCodes } from "@/services/api.ts";
import { CommandSearch } from "@/components/CommandSearch.tsx";
import { GroupManager } from "@/components/GroupManager.tsx";
import { CodeBadge } from "@/components/CodeBadge.tsx";
import { useSelectedCodes } from "@/lib/selectedCodeContext";

export function MainContent() {
  const selectedCodes = useSelectedCodes();

  const allCodesResult = useQuery({
    queryKey: ["allCodes"],
    queryFn: fetchAllCodes,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });

  let allCodes;

  if (allCodesResult.isPending) {
    allCodes = [{ code: "Loading codes..." }];
  }

  if (allCodesResult.isError) {
    allCodes = [{ code: "Error loading codes." }];
  }

  if (allCodesResult.isSuccess) {
    allCodes = allCodesResult.data;
  }

  return (
    <div className="content flex flex-1 flex-col gap-4 p-4">
      <div className="content_header flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-primary">Selected Codes</h4>
          <CommandSearch allCodes={allCodes!} />
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
