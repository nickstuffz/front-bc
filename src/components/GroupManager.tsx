import * as React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchCompatData } from "@/services/api.ts";
import { intersectArrays } from "@/lib/utils.ts";
import { CardGroup } from "@/components/CardGroup.tsx";
import { GroupedCompatDataType } from "@/types/types.ts";

interface GroupManagerProps {
  selectedCodes: string[];
}

export function GroupManager({ selectedCodes }: GroupManagerProps) {
  // TanStack queries hook to fetch data
  const queries = useQueries({
    queries: selectedCodes.map((code) => ({
      queryKey: ["compatData", code],
      queryFn: () => fetchCompatData(code),
      enabled: !!code,
    })),
  });

  console.log(selectedCodes);

  // derive overall state of queries using `useMemo`
  const overallState = React.useMemo(() => {
    const isError = queries.some((query) => query.isError);
    const isLoading = queries.some((query) => query.isLoading);
    return { isError, isLoading };
  }, [queries]);

  // handle no selection
  if (selectedCodes.length === 0) {
    return (
      <small className="text-primary">Please select a component code</small>
    );
  }
  // handle error state
  if (overallState.isError) {
    return <div>Failed to fetch compatibility data.</div>;
  }
  // handle loading state
  if (overallState.isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }
  // query success state
  if (queries.every((query) => query.isSuccess)) {
    console.log("success");
    // extract pod ids from each compatibility response
    const compatDataPods = queries.map((query) => {
      return query.data.compData.map((component) => component.pod_id);
    });

    // find intersection of these pod ids
    const intersectedPods = intersectArrays(compatDataPods);

    // filter list of components to compatibility with all selected codes
    const filteredCompData = queries[0].data.compData.filter(
      // filter from first query (any query in the set will work)
      (component) =>
        intersectedPods.includes(component.pod_id) && // include component IF its pod_id is part of the intersected pod numbers
        intersectedPods.includes(component.source_pod_id), // AND its source_pod_id is part of the intersected pod numbers
    );

    // selected codes set incompatible
    if (filteredCompData.length === 0) {
      return (
        <small className="text-destructive">
          Selected components do not share compatibility.
        </small>
      );
    }

    // groups filtered data by source pod id
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
  // handle unexpected state
  else {
    return <small className="text-destructive">Unexpected state error.</small>;
  }
}
