import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCodes } from "@/services/api.ts";
import { CommandSearch } from "@/components/CommandSearch.tsx";
import { GroupManager } from "@/components/GroupManager.tsx";
import { CodeBadge } from "@/components/CodeBadge.tsx";

export function MainContent() {
  const [selectedCodes, setSelectedCodes] = React.useState<string[]>([]);

  function removeCode(code: string) {
    setSelectedCodes(
      selectedCodes.filter((selectedCode) => selectedCode !== code),
    );
    return;
  }

  const allCodesResult = useQuery({
    queryKey: ["allCodes"],
    queryFn: fetchAllCodes,
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
    <div className="content flex flex-col gap-4 p-4">
      <div className="content_header flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-primary">Selected Codes</h4>
          <CommandSearch
            allCodes={allCodes!}
            selectedCodes={selectedCodes}
            setSelectedCodes={setSelectedCodes}
          />
        </div>
        <div className="badge_container flex flex-wrap gap-2 p-1">
          {selectedCodes.map((code) => (
            <CodeBadge key={code} code={code} removeCode={removeCode} />
          ))}
        </div>
      </div>

      <GroupManager selectedCodes={selectedCodes} />
    </div>
  );
}
