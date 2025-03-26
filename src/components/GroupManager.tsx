import { useQueries } from "@tanstack/react-query";
import * as React from "react";
import { fetchCompatData } from "@/services/api.ts";
import { intersectArrays } from "@/lib/utils.ts";
import { CardGroup } from "@/components/CardGroup.tsx";
import { CompatDataResponse, GroupedCompatDataType } from "@/types/types.ts";

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

  // derive overall query states using `useMemo`
  const overallState = React.useMemo(() => {
    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);
    return { isLoading, isError };
  }, [queries]);

  // handle no selection
  if (selectedCodes.length === 0) {
    return <div>Please select a component code</div>;
  }

  // handle loading state
  if (overallState.isLoading) {
    return <div>Loading...</div>;
  }

  // handle error state
  if (overallState.isError) {
    return <div>Failed to fetch compatibility data.</div>;
  }

  console.log(queries);

  const compatDataPods = queries.map((query) => {
    return (query.data as CompatDataResponse).compData.map(
      (component) => component.pod_id,
    );
  });

  const intersectedPods = intersectArrays(compatDataPods);

  console.log(intersectedPods);

  const filteredCompData = queries[0].data.compData.filter(
    (component) =>
      intersectedPods.includes(component.pod_id) && // include component IF its pod_id is part of the intersection
      intersectedPods.includes(component.source_pod_id), // AND its source_pod_id is part of the intersection
  );

  console.log(filteredCompData);

  // groups compat data by source pod id
  const groupedCompatData = filteredCompData.reduce(
    (acc: GroupedCompatDataType, compatComponent) => {
      if (!acc[compatComponent.source_pod_id]) {
        acc[compatComponent.source_pod_id] = [];
      }
      acc[compatComponent.source_pod_id].push(compatComponent);
      return acc;
    },
    {},
  );

  return (
    <>
      {Object.keys(groupedCompatData).map((source_pod_id) => (
        <CardGroup
          key={source_pod_id}
          groupData={groupedCompatData[source_pod_id]}
        />
      ))}
    </>
  );
}
