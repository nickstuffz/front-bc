import * as React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchCompatData } from "@/services/api.ts";
import { intersectArrays } from "@/lib/utils.ts";
import { CardGroup } from "@/components/CardGroup.tsx";
import { GroupedCompatDataType } from "@/types/types.ts";
import { useSelectedCodes } from "@/lib/selectedCodeUtils";
import { useSpinnerContext } from "@/lib/spinnerUtils";

export function GroupManager() {
  const selectedCodes = useSelectedCodes(); // Consume selected codes from context
  const { setSpinnerActive } = useSpinnerContext(); // Consume set spinner state from context

  // TanStack useQueries to query each selected code
  const queries = useQueries({
    queries: selectedCodes.map((code) => ({
      queryKey: ["compatData", code],
      queryFn: () => fetchCompatData(code), // Axios call to fetch compatibility data for particular code
      enabled: !!code, // Query only enabled if code is truthy
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      gcTime: 1000 * 60 * 60 * 24, // 1 day
    })),
  });

  // Derive overall state of queries
  const overallQueryState = React.useMemo(() => {
    const isError = queries.some((query) => query.isError);
    const isLoading = queries.some((query) => query.isLoading);
    const isSuccess = queries.every((query) => query.isSuccess);
    return { isError, isLoading, isSuccess };
  }, [queries]);

  // Empty selectedCodes path
  if (selectedCodes.length === 0) {
    return (
      <small className="text-destructive">
        Please select a component code.
      </small>
    );
  }

  // overallQueryState error path
  else if (overallQueryState.isError) {
    setSpinnerActive(false);
    return (
      <small className="text-destructive">
        Failed to fetch compatibility data.
      </small>
    );
  }

  // overallQueryState loading path
  else if (overallQueryState.isLoading) {
    setSpinnerActive(true);
    return <div>Loading...</div>; // REPLACE WITH EXISTING DATA UI
  }

  // overallQueryState success path
  else if (overallQueryState.isSuccess) {
    // Ensure query data is available, should cover TS non-null assertions below
    if (queries.some((query) => !query?.data?.compData)) {
      return (
        <small className="text-destructive">Missing compatibility data.</small>
      );
    }

    // Process query data START

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

    // Process query data END

    // No compatible components path
    if (filteredCompData.length === 0) {
      return (
        <small className="text-destructive">
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
