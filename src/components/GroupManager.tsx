import { useQueries } from "@tanstack/react-query";
import * as React from "react";
import axios from "axios";
// import CardGroup from "@/components/CardGroup.tsx";
import { CompatComponentType, GroupedCompatDataType } from "@/types/types.ts";

interface GroupManagerProps {
  selectedCodes: string[];
}

async function fetchCompatData(code: string): Promise<CompatComponentType> {
  const response = await axios.get(
    `http://localhost:8080/api/compatibility?code=${code}`,
  );
  return response.data;
}

export default function GroupManager({ selectedCodes }: GroupManagerProps) {
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

  return <p>QuerySuccess</p>;
}
// const [compatData, setCompatData] = React.useState<
//   { code: string; data: CompatComponentType }[]
// >([]);
// const [error, setError] = React.useState<string | null>(null);
// const cache = React.useRef<{ [key: string]: CompatComponentType }>({});

// React.useEffect(() => {
//   if (selectedCodes.length === 0) {
//     return; // no selected codes, skip all
//   }

//   const newCodes = selectedCodes.filter((code) => !(code in cache.current)); // determine new codes

//   // combine all cached data for selected codes
//   const selectedCodesData = selectedCodes.flatMap((code) => {
//     return { code, data: cache.current[code] || [] };
//   });

//   // Update the state with the combined data
//   setCompatData(selectedCodesData);

//   if (newCodes.length === 0) {
//     return; // no new codes, skip fetching
//   }

//   async function fetchCompatData(newCodes: string[]) {
//     try {
//       // fetch data for all new codes
//       const responses = await Promise.all(
//         newCodes.map(async (newCode) => {
//           const response = await axios.get(
//             `http://localhost:8080/api/compatibility?code=${newCode}`,
//           );
//           return { code: newCode, data: response.data };
//         }),
//       );

//       // update the cache with the fetched data
//       responses.forEach(({ code, data }) => {
//         cache.current[code] = data;
//       });

//       setError(null);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch compatibility data.");
//     }
//   }

//   fetchCompatData(newCodes);
// }, [selectedCodes]);

// if (selectedCodes.length === 0) {
//   return <div>select a component to find compatible components</div>;
// }

// if (error) {
//   // render error (handle better in future)
//   return <div>{error}</div>;
// }

// TESTING RETURN

// console.log(compatData);

// return <p>Console</p>;

// continue with data below

// groups compat data by source pod id

// const groupedCompatData = compatData.reduce(
//   (acc: GroupedCompatDataType, compatComponent) => {
//     if (!acc[compatComponent.source_pod_id]) {
//       acc[compatComponent.source_pod_id] = [];
//     }
//     acc[compatComponent.source_pod_id].push(compatComponent);
//     return acc;
//   },
//   {},
// );

// return (
//   <>
//     {Object.keys(groupedCompatData).map((source_pod_id) => (
//       <CardGroup
//         key={source_pod_id}
//         groupData={groupedCompatData[source_pod_id]}
//       />
//     ))}
//   </>
// );
// }
