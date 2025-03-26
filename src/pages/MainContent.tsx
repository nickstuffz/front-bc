import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCodes } from "@/services/api.ts";
import { CommandSearch } from "@/components/CommandSearch.tsx";
import { GroupManager } from "@/components/GroupManager.tsx";

export function MainContent() {
  const [selectedCodes, setSelectedCodes] = React.useState<string[]>([]);

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
      <CommandSearch
        allCodes={allCodes!}
        selectedCodes={selectedCodes}
        setSelectedCodes={setSelectedCodes}
      />

      <GroupManager selectedCodes={selectedCodes} />
    </>
  );
}
