import * as React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchCompatData } from "@/services/api.ts";
import { intersectArrays } from "@/lib/toolUtils";
import { CardGroup } from "@/components/CardGroup.tsx";
import { GroupedCompatDataType } from "@/types/types.ts";
import { useSelectedCodes } from "@/lib/selectedCodeUtils";
import { useSpinnerAction } from "@/lib/spinnerUtils";

export function GroupManager() {
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context
  const setSpinnerActive = useSpinnerAction(); // Consume set spinner state from context
  const previousGroupedDataRef = React.useRef<GroupedCompatDataType | null>(
    null,
  ); // Ref to store previous succesful data

  // TanStack useQueries to query each selected code
  const queries = useQueries({
    queries: selectedCodes.map((codeObj) => ({
      queryKey: ["compData", codeObj.code],
      queryFn: () => fetchCompatData(codeObj.code), // Axios call to fetch compatibility data for particular code
      enabled: !!codeObj.code, // Query only enabled if code is truthy
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      gcTime: 1000 * 60 * 60 * 24, // 1 day
      // placeholderData implementation does NOT work with useQueries, manual useEffect required
    })),
  });

  // Derive overall state of queries
  const overallQueryState = React.useMemo(() => {
    const isError = queries.some((query) => query.isError);
    const isPending = queries.some((query) => query.isPending);
    const isSuccess = queries.every((query) => query.isSuccess);
    return { isError, isPending, isSuccess };
  }, [queries]);

  // Spinner state management on overallQueryState status
  React.useEffect(() => {
    if (overallQueryState.isPending) {
      setSpinnerActive(true);
    } else {
      setSpinnerActive(false);
    }
  }, [overallQueryState.isPending, setSpinnerActive]);

  // Empty selectedCodes path
  if (selectedCodes.length === 0) {
    previousGroupedDataRef.current = null; // Clear previous data ref for next loading state
    return (
      <small className="text-primary">Please select a component code.</small>
    );
  }

  // overallQueryState error path
  if (overallQueryState.isError) {
    return (
      <small className="text-destructive">
        Failed to fetch compatibility data.
      </small>
    );
  }

  // overallQueryState loading path
  if (overallQueryState.isPending) {
    // Render using previous grouped data if available
    if (previousGroupedDataRef.current) {
      const previousGroupedData = previousGroupedDataRef.current;

      return (
        <div className="group_container flex flex-1 flex-col gap-4">
          {Object.keys(previousGroupedDataRef.current).map((source_pod_id) => (
            <CardGroup
              key={source_pod_id}
              groupData={previousGroupedData[source_pod_id]}
            />
          ))}
        </div>
      );
    }

    // Fallback if no previous data
    return null;
  }

  // overallQueryState success path
  if (overallQueryState.isSuccess) {
    // TS doesn't recognize bundled overallQueryState. Ensure query data is available, should cover TS non-null assertions below.
    if (queries.some((query) => !query?.data?.compData)) {
      return (
        <small className="text-destructive">Missing compatibility data.</small>
      );
    }

    // START PROCESS QUERY DATA

    // Extract pod_ids from each compatibility response
    const compatDataPods = queries.map((query) => {
      return query.data!.compData.map((component) => component.pod_id);
    });

    // Find intersection of pod_ids
    const intersectedPods = intersectArrays(compatDataPods);

    // Filter list of components to only ones that are truly compatible with intersected pods
    const filteredCompData = queries[0].data!.compData.filter(
      // Filter from first queried component (any will work)
      (component) =>
        intersectedPods.includes(component.pod_id) && // Include component if its pod_id is part of the intersected pod ids
        intersectedPods.includes(component.source_pod_id), // AND its source_pod_id is part of the intersected pod ids
    );

    // END PROCESS QUERY DATA

    // No compatible components path
    if (filteredCompData.length === 0) {
      previousGroupedDataRef.current = null; // Clear previous data ref for next loading state
      return (
        <small className="text-primary">
          Selected components do not share compatibility.
        </small>
      );
    }

    // Group components by source_pod_id for routing into CardGroup components
    const groupedCompatData = filteredCompData.reduce(
      (groupedData: GroupedCompatDataType, compatComponent) => {
        if (!groupedData[compatComponent.source_pod_id]) {
          groupedData[compatComponent.source_pod_id] = [];
        }
        groupedData[compatComponent.source_pod_id].push(compatComponent);
        return groupedData;
      },
      {},
    );

    previousGroupedDataRef.current = groupedCompatData; // Set previous data ref for next loading state

    return (
      <div className="group_container flex flex-1 flex-col gap-4">
        {Object.keys(groupedCompatData).map((source_pod_id) => (
          <CardGroup
            key={source_pod_id}
            groupData={groupedCompatData[source_pod_id]}
          />
        ))}
      </div>
    );
  }
  // Unexpected state path, should never happen
  else {
    return <small className="text-destructive">Unexpected state error.</small>;
  }
}
