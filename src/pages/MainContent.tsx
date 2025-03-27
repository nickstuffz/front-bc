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
    <>
      <div className="flex items-center justify-between">
        <div>
          {selectedCodes.map((code) => (
            <CodeBadge key={code} code={code} removeCode={removeCode} />
          ))}
        </div>
        <CommandSearch
          allCodes={allCodes!}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
        />
      </div>

      <GroupManager selectedCodes={selectedCodes} />
    </>
  );
}
